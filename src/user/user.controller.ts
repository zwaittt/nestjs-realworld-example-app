import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
  Session,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private atuhService: AuthService,
  ) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user')
  @UseGuards(JwtAuthGuard)
  async update(
    @User('userId') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Session() session, @Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('user/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body('user') loginUserDto: LoginUserDto,
    @Req() req,
  ): Promise<UserRO> {
    return this.atuhService.login(req.user);
  }
}
