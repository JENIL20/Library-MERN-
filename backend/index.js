import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userrouter from './routes/userroute.js'
import bookrouter from './routes/bookroute.js'
import msgrouter from './routes/msgroute.js'
import setupSocket from './socket.js'

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userrouter)
app.use('/book', bookrouter)
app.use('/msg', msgrouter)

const server = app.listen(5000, () => {
  console.log("connected at 5k");
})

setupSocket(server)