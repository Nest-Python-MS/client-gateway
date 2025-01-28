import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [UsersModule, PagesModule],
})
export class AppModule {}
