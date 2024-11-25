import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "./Product";
import { ProductInput, ProductUpdateInput } from "./ProductInput";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products() {
    return Product.find({ relations: ["reviews"] });
  }

  @Mutation(() => Product)
  addProduct(@Arg("input", () => ProductInput) input: ProductInput) {
    return Product.create({ ...input }).save();
  }

  @Mutation(() => Product)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return Product.softRemove(product);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => ProductUpdateInput) input: ProductUpdateInput
  ) {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error("Product not found.");
    }

    return Product.save({ ...product, ...input });
  }
}
