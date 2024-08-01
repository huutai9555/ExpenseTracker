import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/entities/expense.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Expense, User])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
