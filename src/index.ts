import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { buildSchema } from "type-graphql";

import { AppDataSource } from "./dataSource";

import { ReviewResolver } from "./review/ReviewResolver";
import { ProductResolver } from "./product/ProductResolver";

const main = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  const schema = await buildSchema({
    resolvers: [ProductResolver, ReviewResolver],
    emitSchemaFile: true,
    validate: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

main().catch((error) => console.error(error));
