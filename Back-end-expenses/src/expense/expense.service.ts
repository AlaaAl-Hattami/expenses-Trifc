// expense.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { expense } from './entities/expense.entity';
// هذا خاص بالتحكم في البيانات بين الواجهه وبيانات قاعده البيانات
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(expense)
    private expenseRepository: Repository<expense>,
  ) {}

  findAll(): Promise<expense[]> {
    return this.expenseRepository.find();
  }

  async findOne(id: number): Promise<expense | null> {
    const res = await this.expenseRepository.findOneBy({ id });
    return res;
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<expense> {
    return await this.expenseRepository.save(createExpenseDto);
  }

  async update(id: number, updatedExpense: UpdateExpenseDto): Promise<expense> {
    await this.expenseRepository.update(id, updatedExpense);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(
        `Expense with id ${id} not found after update`,
      );
    }
    return updated;
  }

  delete(id: number): Promise<void> {
    return this.expenseRepository.delete(id).then(() => undefined);
  }

  async delteAll(): Promise<void> {
    return await this.expenseRepository.clear().then(() => undefined);
  }
}
