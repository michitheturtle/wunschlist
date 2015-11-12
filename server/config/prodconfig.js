/**
 * Created by michael on 12.11.15.
 */

var path = require('path');
var rootPath = path.normalize(__dirname + "/../../")

module.exports = {

    dbConnectionString : 'mongodb://michael:multivision@ds053194.mongolab.com:53194/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 8090
}