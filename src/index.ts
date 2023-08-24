import 'dotenv/config.js';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MySqlDatasource } from "./data.sources/mysql.datasource.js";
import { application } from './application.js';
import { ApolloDatasource } from './data.sources/mysql.apollo.datasource.js';
import {
  apolloConfig, colleagueToolsConfig
} from './environment.js';

// process.env.USER_ID

console.log(apolloConfig(process.env));

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
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        tickets: new MySqlDatasource({ knexConfig: apolloConfig(process.env), cache }),
        ct: new MySqlDatasource({ knexConfig: colleagueToolsConfig(process.env), cache})
      }
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);