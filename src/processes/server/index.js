import { ProcessHandler } from 'n158/classes';
import { modelMongoTransaction } from "n158/http-pipeline-handlers";
import { connectMongoDb } from "n158/services";
import { modelsMap, CurrencyModel } from "../../shared/mongo-db-models";
import {
    getSessionHandler, validateSessionExistsHandler,
    redirectionHandler, setSessionCookie, rootHandler
} from './http-pipeline-handlers';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

// Setup process handler settings
var procSettingsPath = path.join(__dirname, './settings.yaml');
var procSettings = yaml.safeLoad(fs.readFileSync(procSettingsPath, 'utf-8'));

// Init process handler
var processHandler = new ProcessHandler(procSettings);

// Setup db
processHandler.set('dbUrl', (
    process.env.DB_URL || 
    (
        process.env.PROD ?
        'mongodb://localhost:27017/localbd' :
        'mongodb://localhost:27017/localbd'
    )
));
processHandler.set('dbName', (
    process.env.DB_URL || 
    (
        process.env.PROD ?
        'localbd' : 'localbd'
    )
));

// Setup server port
processHandler.set('httpPort', process.env.PORT || processHandler.get('httpPort'));

// Setup db models
Object.keys(modelsMap).forEach((k) => {
    processHandler.set('core-db-models/'+k, modelsMap[k]);
});

// Setup webapps
const ignoredWebapps = ['.DS_Store', '.seed', '_invitation'];
fs.readdirSync(path.join(__dirname, './webapps'), {encoding: 'utf8'})
.filter(f => !ignoredWebapps.includes(f)).forEach(file => {
    let manifest = JSON.parse(fs.readFileSync(path.join(__dirname, `./webapps/${file}/manifest.json`), 'utf-8'));
    processHandler.set(`${file}-webapp`, path.join(__dirname, `./webapps/${file}/${manifest.distributionPath}`));
});

// Setup handlers
processHandler.set('modelMongoTransactionHandler', modelMongoTransaction);
processHandler.set('getSessionHandler', getSessionHandler);
processHandler.set('validateSessionExistsHandler', validateSessionExistsHandler);
processHandler.set('redirectionHandler', redirectionHandler);
processHandler.set('setSessionCookieHandler', setSessionCookie);
processHandler.set('rootHandler', rootHandler);

// Start servers
connectMongoDb(
    processHandler.get('dbUrl'), processHandler.get('dbName')
).then((mongoDb) => {
    console.log('Connected to mongodb');

    // Setup mongo db
    processHandler.set('mongoDb', mongoDb);

    // Start http servers
    processHandler.startHTTPServers().then((results) => {
        results.forEach((r) => {
            console.log('HTTP Server '+r.serverName+' is running at port '+r.ports.http);
        });
    });
}).catch((err) => {
    console.log('Error connecting mongodb', err);
})