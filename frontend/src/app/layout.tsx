import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Teaching Platform - Hệ Thống LMS Gia Sư Cá Nhân Hóa 1-1',
  description: 'Nền tảng học tập cá nhân hóa 1-on-1 cho học sinh từ Lớp 2 đến Lớp 12',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
