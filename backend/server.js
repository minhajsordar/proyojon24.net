import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import serviceRouter from './routes/serviceRoutes.js'
import serviceCategoryRouter from './routes/serviceCategoryRoutes.js'
import serviceProviderRouter from './routes/serviceProviderRoutes.js'
import divisionRouter from './routes/divisionRoutes.js'
import districtRoutes from './routes/districtRoutes.js'
import subDistrictRoutes from './routes/subDistrictRoutes.js'
import unionRoutes from './routes/unionRoutes.js'
// import wardRoutes from './routes/wardRoutes.js'
import commonNotificationRoutes from './routes/commonNotificationRoutes.js'
import personalRoomRoutes from './routes/personalRoomRoutes.js'
import personalMessageRoutes from './routes/personalMessageRoutes.js'
import pinLocationRoutes from './routes/pinLocationRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import dashboardSummaryRouter from './routes/dashboardSummaryRoute.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { importData } from './seeder.js'
// import { importData } from './seederDivisions.js'
// import { importData } from './seederDistricts.js'
// import { importData } from './seederSubDistricts.js'
// import { importData } from './seederUnions.js'
import { createServer } from "http";
import { Server } from "socket.io";
import { userJoin } from './utils/chatUser.js'



connectDB()
dotenv.config()

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:9000"
    }
});

io.on("connection", (socket) => {
    socket.on('joinRoom', (arg) => {
        // const user = userJoin(socket.id, room)
        if (arg?._id) {
            socket.join(arg._id)
        }
    })
    socket.on('creating_new_message', (arg) => {
        // const user = userJoin(socket.id, room)
        socket.to(arg.room).emit('receiving_new_message','ping-new-message')
    })
    
});

app.use((req, res, next) => {
    req.io = io
    next()
})
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'development') {
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
app.use('/api/services', serviceRouter)
app.use('/api/service_categorys', serviceCategoryRouter)
app.use('/api/service_providers', serviceProviderRouter)
app.use('/api/divisions', divisionRouter)
app.use('/api/districts', districtRoutes)
app.use('/api/subdistricts', subDistrictRoutes)
app.use('/api/unions', unionRoutes)
// app.use('/api/wards',wardRoutes)
app.use('/api/common_notifications', commonNotificationRoutes)
app.use('/api/room', personalRoomRoutes)
app.use('/api/message', personalMessageRoutes)
app.use('/api/pinlocations', pinLocationRoutes)
app.use('/api/dashboard', dashboardSummaryRouter)
app.get('/api/seeder', (req, res) => {
    importData()
    res.send("data Imported")
})

// Upload router
app.use('/api/upload', uploadRouter)


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Custom error handler
app.use(errorHandler)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
} else {
    // hands up routes
    app.get('/', (req, res) => {
        res.send('Api is running now')
    })
}

app.use(notFound)

httpServer.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`));

// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))