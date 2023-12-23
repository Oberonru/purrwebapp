import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/authDto';
import * as jwtToken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      const userEntity = new UserEntity();
      Object.assign(userEntity, dto);

      this.userRepository.save(userEntity);

      return jwtToken.sign({ userId: userEntity.id }, process.env.JWT_SECRET);
    }

    return 'user is exist';
  }

  async login(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    const isEquals = await bcrypt.compare(dto.password, user.password);

    if (user && isEquals) {
      return await jwtToken.sign({ userId: user.id }, process.env.JWT_SECRET);
    }

    throw new UnauthorizedException();
  }
}
