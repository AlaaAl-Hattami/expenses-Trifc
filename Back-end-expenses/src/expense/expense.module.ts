import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { expense } from './entities/expense.entity';
// هذا مودل خاص بقاعده البيانات التي تم انشائها في ملف expense.entity.ts
@Module({
  imports: [TypeOrmModule.forFeature([expense])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
