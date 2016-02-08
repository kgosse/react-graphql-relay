/**
 * Created by kevin gosse on 08/02/2016.
 */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from 'graphql';

let counter = 42;
let data = [42, 43, 44];

let Schema = (db) => {
    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            _id: { type: GraphQLString },
            title: { type: GraphQLString },
            url: { type: GraphQLString }
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () => db.collection('links').find({}).toArray()
                },
                counter: {
                    type: GraphQLInt,
                    resolve: () => 42
                },
                message: {
                    type: GraphQLString,
                    resolve: () => "Hello GraphQL"
                }
            })
        }),

        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: () => ({
                incrementCounter: {
                    type: GraphQLInt,
                    resolve: () => ++counter
                }
            })
        })
    });

    return schema;
};


export default Schema;
