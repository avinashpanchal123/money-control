const async = require('async');
const dbConnector = require('./db/dbconnector');
const authConnection = require('./db/db');
const modelsList = require('./db/modelsList')

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

}], (err)=>{
    console.log(err);
})