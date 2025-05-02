// expense.controller.ts
// هذا خاص بالتحكم الروابط بين الواجهه وبيانات قاعده البيانات
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedExpense: UpdateExpenseDto) {
    return this.expenseService.update(+id, updatedExpense);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.expenseService.delete(+id);
  }

  @Delete()
  delteAll() {
    return this.expenseService.delteAll();
  }
}
