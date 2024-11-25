import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ length: 255, nullable: false, type: "varchar" })
  content!: string;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Field(() => Date)
  @DeleteDateColumn({ nullable: true, name: "deleted_at" })
  deletedAt?: Date;
}
