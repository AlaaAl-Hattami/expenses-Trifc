// expense.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// هذا لاعمده الخاصه بقاعده البيانات
@Entity()
export class expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('float')
  amount: number;

  @Column()
  date: string;
}
