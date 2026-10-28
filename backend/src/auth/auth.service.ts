import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { user_role, ui_mode } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Kiểm tra username tồn tại
    const existingUsername = await this.prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) {
      throw new BadRequestException('Tên đăng nhập đã được sử dụng');
    }

    // 2. Kiểm tra email nếu có
    if (dto.email) {
      const existingEmail = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });
      if (existingEmail) {
        throw new BadRequestException('Email đã được đăng ký');
      }
    }

    // 3. Nếu là STUDENT thì bắt buộc phải có gradeLevel
    if (dto.role === user_role.STUDENT && !dto.gradeLevel) {
      throw new BadRequestException('Vui lòng chọn khối lớp cho học sinh (từ 1 đến 12)');
    }

    // 4. Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // 5. Tạo user trong transaction
    const newUser = await this.prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          username: dto.username,
          email: dto.email || null,
          password_hash: passwordHash,
          full_name: dto.fullName,
          role: dto.role,
        },
      });

      if (dto.role === user_role.STUDENT) {
        // Tự động chọn theme phù hợp nếu chưa truyền
        let defaultTheme: ui_mode = ui_mode.STANDARD_SECONDARY;
        if (dto.gradeLevel && dto.gradeLevel <= 5) {
          defaultTheme = ui_mode.KIDS_ELEMENTARY;
        } else if (dto.gradeLevel && dto.gradeLevel >= 10) {
          defaultTheme = ui_mode.HIGH_SCHOOL_EXAM;
        }

        await tx.student_profiles.create({
          data: {
            user_id: user.id,
            grade_level: dto.gradeLevel || 7,
            ui_theme: dto.uiTheme || defaultTheme,
          },
        });
      }

      return user;
    });

    const token = this.generateToken(newUser.id, newUser.username, newUser.role);

    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.full_name,
        role: newUser.role,
      },
      accessToken: token,
    };
  }

  async login(dto: LoginDto) {
    // 1. Tìm user theo username hoặc email
    const user = await this.prisma.users.findFirst({
      where: {
        OR: [
          { username: dto.identifier },
          { email: dto.identifier },
        ],
      },
      include: {
        student_profiles: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Tài khoản đã bị tạm khóa');
    }

    // 2. So khớp mật khẩu
    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    // 3. Tạo token
    const token = this.generateToken(user.id, user.username, user.role);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        studentProfile: user.student_profiles,
      },
      accessToken: token,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
        created_at: true,
        student_profiles: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Không tìm thấy người dùng');
    }

    return user;
  }

  private generateToken(userId: string, username: string, role: string): string {
    return this.jwtService.sign({
      sub: userId,
      username,
      role,
    });
  }
}
