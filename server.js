import express from 'express'
import mongoose from 'mongoose'
import endpoints from 'express-list-endpoints'
import dotenv from 'dotenv'
import cors from 'cors'
import authorsRoute from './routes/AuthorsRoutes.js'
import postRoute from './routes/BlogpostRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('mongoDB connesso'))
.catch((err) => console.error('mongoDB non connesso', err))

const PORT = process.env.PORT || 4000

app.use('/api', authorsRoute)
app.use('/api', postRoute)

app.listen(PORT, () => {
    console.log(`server presente nella porta ${PORT}`);
    console.log('endpoint disponibili:');
    console.table(endpoints(app))
})