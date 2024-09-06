const authConnection = (connector, callback)=>{
    connector.authenticate().then((res) => {
        console.log(res, 'connection_res')
        console.log('Connection has been established successfully.');
        process.nextTick(callback, null,'hello')
     }).catch((err) => {
        console.error('Unable to connect to the database: ', err);
        process.nextTick(callback, new Error(err))
     });
}


module.exports = authConnection;

