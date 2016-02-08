/**
 * Created by kevin gosse on 08/02/2016.
 */

var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('./data/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);
