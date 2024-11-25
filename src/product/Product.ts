import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../review/Review";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ length: 255, nullable: false, type: "varchar" })
  name!: string;

  @Field(() => Float)
  @Column({ type: "float", nullable: false })
  price!: number;

  @Field(() => String)
  @Column({ length: 255, nullable: false, type: "varchar" })
  description!: string;

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true, name: "deleted_at" })
  deletedAt?: Date;
}
