import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/user.model';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  private static cookieExtractor(req: Request): string | null {
    if (req && req.cookies) {
      return req.cookies['jwt'];
    }
    return null;
  }

  async validate(payload: { sub: string; email: string }) {
    const userId = payload.sub;
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException(
        'Unauthorized user. You must sign in first.',
      );
    }

    delete user.password;
    return user;
  }
}
