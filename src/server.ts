import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import express from 'express';
import path from 'path';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

require('dotenv').config();

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Starts the ApolloServer
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

  // Stats the server
  httpServer.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
};

main();
