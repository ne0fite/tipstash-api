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

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'job',
})
export default class Job extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id: string;

  @BelongsTo(() => Account)
  account: Account;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId: string;

  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.DOUBLE)
  payRate: number;

  @Column(DataType.TEXT)
  defaultClockIn: string;

  @Column(DataType.TEXT)
  defaultClockOut: string;

  @Column(DataType.BOOLEAN)
  defaultJob: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
