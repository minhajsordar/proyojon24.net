import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import divisionRouter from './routes/divisionRoutes.js'
import districtRoutes from './routes/districtRoutes.js'
import subDistrictRoutes from './routes/subDistrictRoutes.js'
import unionRoutes from './routes/unionRoutes.js'
import wardRoutes from './routes/wardRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { importData } from './seeder.js'

connectDB()
dotenv.config()

const app = express()

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.options('*', cors()) 

// This routes is example route to allaw react getting data from same origin
// This res.set route will remove Access-Control-Allow-OriginAccess
// to fetch at 'http://localhost:8080/' from origin 'http://localhost:9000'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is
// present on the requested resource. If an opaque response serves your needs,
// set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
app.get('/cors', (req, res) => {
    res.send({ "msg": "This has CORS enabled 🎈" })
})

// User router
app.use('/api/users', userRouter)
app.use('/api/users', userRouter)
app.use('/api/divisions',divisionRouter)
app.use('/api/districts',districtRoutes)
app.use('/api/subdistricts',subDistrictRoutes)
app.use('/api/unions',unionRoutes)
app.use('/api/wards',wardRoutes)
app.get('/api/seeder', (req,res)=>{
    importData()
    res.send("data Imported")
})

// Product router fetch products
// app.use('/api/products', productRouter)

// Order router
// app.use('/api/orders', orderRouter)

// Upload router
app.use('/api/upload', uploadRouter)


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Custom error handler
app.use(errorHandler)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}else{
    // hands up routes
    app.get('/', (req, res) => {
        res.send('Api is running now')
    })
}

app.use(notFound)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))