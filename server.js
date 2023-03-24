const connectDB = require('./db/db')
const app = require('./app')



//handling error exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server for handling uncaught exception`)
})

//config
if(process.env.NODE_ENV !="PRODUCTION"){
    require('dotenv').config({
        path:'config/.env'
    })
}     

//connect database
connectDB()      


//create server
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})

//unhandled promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`shudding down the server for: ${err.message}`)
    server.close(()=>{
        process.exit(1);
    })
})
