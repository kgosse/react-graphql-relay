/**
 * Created by kevin gosse on 08/02/2016.
 */

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';

let Schema = (db) => {
        let store = {};

        let linkType = new GraphQLObjectType({
            name: 'Link',
            fields: () => ({
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    resolve: (obj) => obj._id
                },
                title: {type: GraphQLString},
                url: {type: GraphQLString}
            })
        });

        let linkConnection = connectionDefinitions({
            name: 'Link',
            nodeType: linkType
        });

        let storeType = new GraphQLObjectType({
            name: 'Store',
            fields: () => ({
                linkConnection: {
                    type: linkConnection.connectionType,
                    args: connectionArgs,
                    resolve: (n, args) => connectionFromPromisedArray(
                        db.collection("links").find({}).limit(args.first).toArray(),
                        args
                    )
                }
            })
        });

        let createLinkMutation = mutationWithClientMutationId({
            name: 'CreateLink',
            inputFields: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                url: {type: new GraphQLNonNull(GraphQLString)}
            },
            outputFields: {
                link: {
                    type: linkType,
                    resolve: (obj) => obj.ops[0]
                }
            },
            mutateAndGetPayload: ({title, url}) => {
                return db.collection('links').insertOne({title, url});
            }
        });


        let schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'Query',
                fields: () => ({
                    store: {
                        type: storeType,
                        resolve: () => store
                    }
                })
            }),

            mutation: new GraphQLObjectType({
                name: 'Mutation',
                fields: () => ({
                    createLink: createLinkMutation
                })
            })
        });

        return schema;
};


export default Schema;
