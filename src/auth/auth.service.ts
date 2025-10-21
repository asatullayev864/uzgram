import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userSchema: Model<UserDocument>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  private async generateTokens(user: UserDocument) {
    const payload = {
      id: user._id.toString(),
      email: user.email,
      username: user.name,
      role: user.role
    }

    const accessSecret = process.env.ACCESS_TOKEN_KEY ?? "MyStrongAccessTokenKey";
    const refreshSecret = process.env.REFRESH_TOKEN_KEY ?? "MyStrongRefreshTokenKey";
    const accessExp = (process.env.ACCESS_TOKEN_TIME ?? '15m') as any;
    const refreshExp = (process.env.REFRESH_TOKEN_TIME ?? '7d') as any;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { secret: accessSecret, expiresIn: accessExp }),
      this.jwtService.signAsync(payload, { secret: refreshSecret, expiresIn: refreshExp })
    ]);
    return { accessToken, refreshToken };
  }


  async registration(createUserDto: CreateUserDto) {
    const { email, user_name, password } = createUserDto;

    const existUser = await this.userSchema.findOne({
      $or: [{ email }, { user_name }],
    });

    if (existUser) {
      throw new BadRequestException("Bunday foydalanuvchi allaqachon mavjud ❗️")
    }

    createUserDto.password = await bcrypt.hash(password, 7);

    const newUser = await this.userSchema.create(createUserDto);

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    const user = await this.userSchema.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException("Email noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME ?? 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return {
      message: 'Foydalanuvchi tizimga kirdi',
      id: user._id,
      accessToken,
    };
  }
}
