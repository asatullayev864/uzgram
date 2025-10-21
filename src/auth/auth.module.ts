import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from '../users/schema/user.schema';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{name: Users.name, schema: UserSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
