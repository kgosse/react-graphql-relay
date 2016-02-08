/**
 * Created by kevin gosse on 05/02/2016.
 */

import express from 'express';
import fs from 'fs';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

import connection from './db';

let app = express();
app.use(express.static('public'));


(async () => {
    let db = await MongoClient.connect(connection.MONGO_URL);
    let schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen(3000, () => console.log('Listening on port 3000'));

    // Genrate schema.json
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
        if (err) throw err;

        console.log("JSON schema created");
    });

})();