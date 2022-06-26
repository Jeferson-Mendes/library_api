import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Create
  async create(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });

    return await this.userRepository.save(user);
  }
}
