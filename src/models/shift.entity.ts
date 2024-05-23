import {
  Table,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import Account from './account.entity';
import Job from './job.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'shift',
})
export default class Shift extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id: string;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsTo(() => Job)
  job: Job;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId: string;

  @ForeignKey(() => Job)
  @Column(DataType.UUID)
  jobId: string;

  @Column(DataType.DATEONLY)
  date: Date;

  @Column(DataType.DATE)
  clockIn: Date;

  @Column(DataType.DATE)
  clockOut: Date;

  @Column(DataType.DOUBLE)
  hours: number;

  @Column(DataType.DOUBLE)
  amount: number;

  @Column(DataType.DOUBLE)
  sales: number;

  @Column(DataType.DOUBLE)
  tipOut: number;

  @Column(DataType.DOUBLE)
  ccTips: number;

  @Column(DataType.DOUBLE)
  tipRate: number;

  @Column(DataType.DOUBLE)
  tipPercent: number;

  @Column(DataType.DOUBLE)
  wages: number;

  @Column(DataType.TEXT)
  notes: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
