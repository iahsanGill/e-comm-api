import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    //hash the password before saving
    const hashedPwd = await argon2.hash(createUserDto.password, {
      type: argon2.argon2id,
    });
    createUserDto.password = hashedPwd;
    return this.userModel.create(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    return this.userModel.update(updateUserDto, {
      where: { id },
    });
  }
}
