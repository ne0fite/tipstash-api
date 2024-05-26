import {
  Table,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  DefaultScope,
  Scopes,
} from 'sequelize-typescript';

import Account from './account.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'user',
})
@DefaultScope(() => ({
  attributes: ['id', 'accountId', 'email', 'createdAt', 'updatedAt'],
  include: [
    {
      model: Account,
      required: true,
    },
  ],
}))
@Scopes(() => ({
  full: {
    include: [
      {
        model: Account,
        required: true,
      },
    ],
  },
}))
export default class User extends Model {
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
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
