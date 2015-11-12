/**
 * Created by michael on 12.11.15.
 */

var path = require('path');
var rootPath = path.normalize(__dirname + "/../../")

module.exports = {

    dbConnectionString : 'mongodb://localhost',
    rootPath: rootPath,
    port: process.env.PORT || 8090
}