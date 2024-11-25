import { Field, InputType, Int } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class ReviewInput {
  @Field(() => String, { nullable: false })
  @MaxLength(255, { message: "Content is too long." })
  content!: string;

  @Field(() => Int, { nullable: false })
  productId!: number;
}
