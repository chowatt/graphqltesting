import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MyDataSource } from "./MyDataSource.js";
import { application } from './application.js';

const knexConfig = {
  client: "mysql",
  connection: {
    host : 'mysql01.howattech.com',
    port : 3306,
    user : 'apollo',
    password : 'apollo',
    database : 'apollo'
  },
};

const apollo2Config = {
  client: "mysql",
  connection: {
    host : 'mysql01.howattech.com',
    port : 3306,
    user : 'apollo',
    password : 'apollo',
    database : 'apollo2'
  },
};

// Optional - if you have different read write instances
const writeKnexConfig = {
  client: "mysql",
  connection: {
    host : 'mysql01.howattech.com',
    port : 3306,
    user : 'apollo',
    password : 'apollo',
    database : 'apollo'
  },
};


const schema = application.createSchemaForApollo();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async() => {
      const {cache} = server;
      return {dataSources: {
        tickets: new MyDataSource({ knexConfig, cache, writeKnexConfig }),
        apollo2: new MyDataSource({ knexConfig :apollo2Config, cache })
      }}
    }
  });
  
  console.log(`🚀  Server ready at: ${url}`);