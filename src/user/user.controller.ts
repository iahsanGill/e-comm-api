import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/flow';
import {
  CreateUserDto,
  CreateUserSchema,
  UpdateUserDto,
  UpdateUserSchema,
} from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { User } from './user.model';
import { GetUser } from 'src/auth/decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(
    @Body(new ZodValidationPipe(CreateUserSchema))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  update(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(updateUserDto, user.id);
  }
}
