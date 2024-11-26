import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Review } from "./Review";
import { ReviewInput } from "./ReviewInput";
import { Product } from "../product/Product";

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  reviews() {
    return Review.find({ relations: ["product"] });
  }

  @Mutation(() => Review)
  async addReview(@Arg("input", () => ReviewInput) input: ReviewInput) {
    const product = await Product.findOne({ where: { id: input.productId } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return Review.create({ ...input, product }).save();
  }

  @Mutation(() => Review)
  async deleteReview(@Arg("id", () => Int) id: number) {
    const review = await Review.findOne({ where: { id } });

    if (!review) {
      throw new Error("Review not found.");
    }

    return Review.softRemove(review);
  }

  @Mutation(() => Review)
  async updateReview(@Arg("id", () => Int) id: number, @Arg("input", () => ReviewInput) input: ReviewInput) {
    const review = await Review.findOne({ where: { id } });

    if (!review) {
      throw new Error("Review not found.");
    }

    const product = await Product.findOne({ where: { id: input.productId } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return Review.save({ ...review, ...input, product });
  }
}
