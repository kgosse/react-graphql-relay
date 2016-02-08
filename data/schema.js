/**
 * Created by kevin gosse on 08/02/2016.
 */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

let counter = 42;

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
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

export default schema;
