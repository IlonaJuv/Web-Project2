require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import api from './api';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
  } from '@apollo/server/plugin/landingPage/default';
import authenticate from './utils/authenticate';
const app = express();

(async () => {
    try {
      app.use(
        helmet({
          crossOriginEmbedderPolicy: false,
          contentSecurityPolicy: false,
        })
      );
      
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(cors());
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
          process.env.ENVIRONMENT === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: 'my-graph-id@my-graph-variant',
                footer: false,
              })
            : ApolloServerPluginLandingPageLocalDefault({footer: false}),
        ],
        includeStacktraceInErrorResponses: false,
      });
      await server.start();

      app.use('/api/', api);
      app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
        context: async ({req}) => authenticate(req),
      }) 
      );
  
      
    } catch (error) {
      throw new Error(error);
    }
  })();



app.get<{}, { msg: string }>('/', (req, res) => {
    return res.json({ msg: 'Hello World!' });
    });



export default app;

/*
//save brute force attack add for later 
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
  } from '@apollo/server/plugin/landingPage/default';
import {createRateLimitRule} from 'graphql-rate-limit';
import {shield} from 'graphql-shield';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {applyMiddleware} from 'graphql-middleware';

import authenticate from './utils/authenticate';
const app = express();

(async () => {
    try {
      const rateLimitRule = createRateLimitRule({
        identifyContext: (ctx) => ctx.id,
      });
      // TODO Create a permissions object
  
      const permissions = shield({
        Mutation: {
          login: rateLimitRule({window: '1s', max: 5}),
        },
      });
      // TODO Apply the permissions object to the schema
      // remember to change the typeDefs and resolvers to a schema object
      const schema = applyMiddleware(
        makeExecutableSchema({
          typeDefs,
          resolvers,
        }),
        permissions
      );
      //
      //
 */