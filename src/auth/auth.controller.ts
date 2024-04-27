import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInUserDto, SignInUserSchema } from './dto/signin-user.dto';
import { ZodValidationPipe } from 'src/flow';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(
    @Body(new ZodValidationPipe(SignInUserSchema)) dto: SignInUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Req() req: Request, @Res() res: Response) {
    return this.authService.signout(req, res);
  }
}
