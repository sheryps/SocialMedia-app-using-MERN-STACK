import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import chatRoute from './Routes/chatRoute.js'
import messageRoute from './Routes/messageRoute.js'
import cors from 'cors'
//Routes

const app=express()

//to serve images for public

app.use(express.static('public'))
app.use('/images',express.static("images"))
//middlewares
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors({
    origin:"http://localhost:3000"
}))
dotenv.config();
//database connection
mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser:true,
    useUnifiedTopology:true}).then(
        //listening app
    ()=>app.listen(process.env.PORT,()=>
    console.log(`listening at port ${process.env.PORT}`)
    )
    )//error if any
    .catch((error)=>console.log(error))

//usage of routes

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',chatRoute)
app.use('/message', messageRoute)