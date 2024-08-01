import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  create(@Req() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(req.user.username, createExpenseDto);
  }

  @Get()
  getAll() {
    return this.expensesService.getAll()
  }
}
