// expense.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';
// هذا خاص بالتحكم في البيانات بين الواجهه وبيانات قاعده البيانات
@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async findOne(id: number): Promise<Expense | null> {
    const res = await this.expenseRepository.findOneBy({ id });
    return res;
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.expenseRepository.save(createExpenseDto);
  }

  async update(id: number, updatedExpense: UpdateExpenseDto): Promise<Expense> {
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
