import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import express from 'express';
import path from 'path';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        path.resolve(__dirname, 'resolvers', '**', '*.{ts,js}'),
      ],
      emitSchemaFile: true,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

main();
