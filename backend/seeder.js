import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import ServiceProvider from './models/serviceProviderModel.js'
import Notification from './models/commonNotificationModel.js'
import PersonalMessage from './models/personalMessageModel.js'
import ServiceCategory from './models/serviceCategoryModel.js'
import Service from './models/serviceModel.js'
import ServiceCategoryModel from './models/serviceCategoryModel.js'
import PersonalRoomModel from './models/personalRoomModel.js'
import PersonalMessageModel from './models/personalMessageModel.js'
import { Counter } from './models/serviceProviderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

export const importData = async () => {
    try {
        await User.deleteMany()
        await ServiceProvider.deleteMany()
        await PersonalRoomModel.deleteMany()
        await PersonalMessageModel.deleteMany()
        await Counter.deleteMany()
        // await Notification.deleteMany()
        // await PersonalMessage.deleteMany()

        const serviceCat = await ServiceCategory.updateMany({},{viewCount:0,serviceProviderCount:0})
        const serviceM = await Service.updateMany({},{viewCount:0,serviceProviderCount:0})
        const createdUsers = await User.insertMany(users)

        // const adminUser = createdUsers[0]._id

        // const sampleProducts = products.map((product) => {
        //     return { ...product, user: adminUser }
        // })

        // await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

export const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

// if (process.argv[2] === '-d') {
//     destroyData()
// } else {
//     importData()
// }