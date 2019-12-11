const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/calculationsResolver');

// const graphQlSchema = require('./graphql/schema/index');
// const graphQlResolvers = require('./graphql/resolvers/index');

// Provide resolver functions for your schema fields

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => {
      console.log('client connected!');
    }
  }
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose
  .connect(
    `mongodb+srv://CarmiCluster:${process.env.MONGO_PASSWORD}@carmicluster-qiffm.mongodb.net/dualtiia?retryWrites=true&w=majority`
  )
  .then(() => {
    httpServer.listen(4500, (req, res, next) => {
      console.log('server is running');
    });
  })
  .catch(err => {
    console.log(err);
  });
