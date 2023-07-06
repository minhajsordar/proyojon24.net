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
import DailyUser from './models/dailyUserModel.js'
import MonthlyUser from './models/monthlyUserModel.js'
import ProfileViewModel from './models/dailyProfileViewModel.js'

dotenv.config()

connectDB()

export const importData = async () => {
    try {
        await User.deleteMany()
        await DailyUser.deleteMany()
        await MonthlyUser.deleteMany()
        await ProfileViewModel.deleteMany()
        await ServiceProvider.deleteMany()
        await PersonalRoomModel.deleteMany()
        await PersonalMessageModel.deleteMany()
        await Counter.deleteMany()
        await Notification.deleteMany()
        await PersonalMessage.deleteMany()

        const serviceCat = await ServiceCategory.updateMany({},{viewCount:0,serviceProviderCount:0})
        const serviceM = await Service.updateMany({},{viewCount:0,serviceProviderCount:0})
        const createdUsers = await User.insertMany(users)
        const today = new Date().setHours(0, 0, 0, 0); // Get current date
        const dailyUser = await DailyUser.findOne({ date: today });
    
        if (dailyUser) {
          dailyUser.userCount = createdUsers.length;
          await dailyUser.save();
        } else {
          const newDailyUser = new DailyUser({ date: today, userCount: createdUsers.length });
          await newDailyUser.save();
        }
        // Update monthly user count
        const today2 = new Date();
        const year = today2.getFullYear();
        const month = today2.getMonth();
    
        const monthlyUser = await MonthlyUser.findOne({ year, month });
    
        if (monthlyUser) {
          monthlyUser.userCount = createdUsers.length;
          await monthlyUser.save();
        } else {
          const newMonthlyUser = new MonthlyUser({ year, month, userCount: createdUsers.length });
          await newMonthlyUser.save();
        }

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