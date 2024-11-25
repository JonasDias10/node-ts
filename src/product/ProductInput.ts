import { Field, Float, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class ProductInput {
  @Field(() => String, { nullable: false })
  @MaxLength(255, { message: "Name is too long." })
  name!: string;

  @Field(() => Float, { nullable: false })
  price!: number;

  @Field(() => String, { nullable: false })
  @MaxLength(255, { message: "Description is too long." })
  description!: string;
}

@InputType()
export class ProductUpdateInput {
  @Field(() => String, { nullable: true })
  @MaxLength(255, { message: "Name is too long." })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  @MaxLength(255, { message: "Description is too long." })
  description?: string;
}
