import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expense.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, createExpenseDto: CreateExpenseDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('username = :username', { username })
      .getOne();
    if (!user) throw new UnauthorizedException();
    console.log(createExpenseDto)
    await this.expensesRepository
      .createQueryBuilder('expense')
      .insert()
      .values([
        {
          ...createExpenseDto,
          user: user,
        },
      ])
      .execute();
    return 'Create successfully!!';
  }

  async getAll() {
    return await this.usersRepository.createQueryBuilder("user").innerJoinAndSelect("user.expenses", "exp").getMany();
  }
}
