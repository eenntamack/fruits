import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import router  from './models/fruits.mjs' 

const app = express()
const port = process.env.PORT || 3000

// Middleware 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/fruits",router)

// Mongoose Connection
mongoose.connect(process.env.ATLAS_URI)
mongoose.connection.once('open', ()=> {
    console.log('connected to mongoDB')
})

// Mock data
//const fruits = ["apple", "banana", "pear"]

// Routes
app.get('/',(req, res)=>{
    res.send('Welcome to the Fruits API!')
})

// seed route


// App.listen
app.listen(port, () =>{
console.log(`Server is running on port ${port}`)
})