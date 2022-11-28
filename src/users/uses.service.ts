import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
@Injectable()
export class UsersService {
constructor(
@InjectRepository(UsersEntity)
private readonly usersRepository: Repository<UsersEntity>,
) {}

  async create(user) {
const userEntity = new UsersEntity();
userEntity.firstName = user.firstName;
userEntity.lastName = user.lastName;
userEntity.email = user.email;
userEntity.role = user.role;
    return await this.usersRepository.save(userEntity);
}
}
