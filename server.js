/**
 * Created by kevin gosse on 05/02/2016.
 */

import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

import connection from './db';

let app = express();
app.use(express.static('public'));


(async () => {
    let db = await MongoClient.connect(connection.MONGO_URL);

    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }));

    app.listen(3000, () => console.log('Listening on port 3000'));
})();