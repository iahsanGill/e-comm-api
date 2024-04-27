import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: SignInUserDto, req: Request, res: Response) {
    const { email, password } = dto;
    //find the user in db
    const foundUser = await this.userModel.findOne({
      where: {
        email,
      },
    });
    //throw error if user doesn't exist
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //check if password is valid
    const isPwdValid = await argon2.verify(foundUser.password, password);
    //throw error if password is invalid
    if (!isPwdValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //sign and return the jwt token in cookie
    const token = await this.signToken(foundUser.id, foundUser.email);

    res.cookie('jwt', token, { httpOnly: true });

    res.json({ message: 'Login Successful' });
  }

  signout(req: Request, res: Response) {
    res.clearCookie('jwt');
    res.send({ message: 'Logged out sucessfully' });
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get<string>('jwt.secret');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '15m',
    });

    return token;
  }
}
