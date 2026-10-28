import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LinkParentDto } from './dto/link-parent.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { user_role } from '@prisma/client';

@ApiTags('Users & Students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('students')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Lấy danh sách tất cả học sinh (Chỉ giáo viên)' })
  async getStudents() {
    return this.usersService.findAllStudents();
  }

  @Post('students')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Tạo tài khoản học sinh mới (Chỉ giáo viên)' })
  async createStudent(@Body() dto: CreateStudentDto) {
    return this.usersService.createStudent(dto);
  }

  @Post('parent-links')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Liên kết tài khoản Phụ huynh với Học sinh (Chỉ giáo viên)' })
  async linkParent(@Body() dto: LinkParentDto) {
    return this.usersService.linkParent(dto);
  }

  @Get('parent/children')
  @Roles(user_role.PARENT)
  @ApiOperation({ summary: 'Lấy danh sách các con liên kết với Phụ huynh hiện tại' })
  async getMyChildren(@CurrentUser('id') parentId: string) {
    return this.usersService.getChildrenForParent(parentId);
  }

  @Patch('students/:id/notes')
  @Roles(user_role.TEACHER)
  @ApiOperation({ summary: 'Cập nhật ghi chú sư phạm riêng về học sinh (Chỉ giáo viên)' })
  async updateNotes(
    @Param('id') studentId: string,
    @Body('notes') notes: string,
  ) {
    return this.usersService.updateTutorNotes(studentId, notes);
  }
}
