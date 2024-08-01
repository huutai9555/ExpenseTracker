import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ExpensesModule } from './expenses/expenses.module';
import { Expense } from './entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'expense-tracker',
    entities: [User, Expense],
    synchronize: true,
  }),UsersModule, AuthModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
