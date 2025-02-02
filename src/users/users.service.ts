import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from '../dto/users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(body: CreateUsersDto): Promise<User> {
    // const userRepository = getRepository(User);
    return await this.usersRepository.save(this.usersRepository.create(body));
  }

  async update(password, id): Promise<any> {
    return await this.usersRepository.update(id, { password: password });
  }
  findOneJoin(id: string): Promise<User> {
    return this.usersRepository.findOne({
      relations: ['habits'],
      where: { id: id },
    });
  }
}
