import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import ormconfig from './mikro-orm.config';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
    const orm = await MikroORM.init(ormconfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });

    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => {
        console.log('Server up at localhost:4000');
    })
}

main();
