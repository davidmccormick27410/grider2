const { Pool }  = require('pg');
const localDatabaseConfiguration = require('./secrets/localDatabaseConfiguration');
const remoteDatabaseConfiguration = require('./secrets/remoteDatabaseConfiguration');
const localPool = new Pool(localDatabaseConfiguration);
const remotePool = new Pool(remoteDatabaseConfiguration);






module.exports = { localPool, remotePool };


