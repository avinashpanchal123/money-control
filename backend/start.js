const async = require('async');
const dbConnector = require('./db/dbconnector');
const authConnection = require('./db/db');
const modelsList = require('./db/modelsList');
const dbInitializer  = require('./support/dbInitializer');

async.series([(callback)=>{
    authConnection(dbConnector, (err, data)=>{
        // console.log(err, data, 'errrrrrrrrrrrrrrrrrrrrrrr');
        if(!err){
            process.nextTick(callback, null)
        }
        else{
            process.nextTick(callback, new Error(err))
        }
    })
}, (callback)=>{
    let tables = Object.keys(modelsList)
    async.eachSeries(tables, (table, callback)=>{
        dbInitializer(dbConnector, 'money_control',table, modelsList, (err, data)=>{
            process.nextTick(callback, err)
        })
    }, (err)=>{
        process.nextTick(callback, null);
    })
}, (callback)=>{
    require('./app');
    process.nextTick(callback, null);
}], (err)=>{
    console.log(err);
})