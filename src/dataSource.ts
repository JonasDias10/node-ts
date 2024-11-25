import { DataSource } from "typeorm";

import { Product } from "./product/Product";
import { Review } from "./review/Review";

import { AddProductTable1732501147310 } from "./migrations/1732501147310-AddProductTable";
import { AddReviewTable1732501440519 } from "./migrations/1732501440519-AddReviewTable";

const entities = [Product, Review];
const migrations = [AddProductTable1732501147310, AddReviewTable1732501440519];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "node-ts",
  synchronize: false,
  logging: true,
  entities,
  migrations,
});
