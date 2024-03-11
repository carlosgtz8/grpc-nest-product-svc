import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class StockDecreaseLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  // Id relacionado
  @Column({ type: 'integer' })
  public orderId!: number;

  // Relacion Muchos a Uno
  @ManyToOne(() => Product, (product) => product.stockDecreaseLogs)
  public product: Product;
}
