import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'urls',
  timestamps: true,
  updatedAt: false,
})
export class Url extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    field: 'short_code',
  })
  declare shortCode: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'long_url',
  })
  declare longUrl: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare expiry: Date | null;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;
}
