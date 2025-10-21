import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post("registration")
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.registration(createAuthDto);
  }
}
