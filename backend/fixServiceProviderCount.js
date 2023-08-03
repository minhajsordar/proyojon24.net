import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/userModel.js'
import ServiceProvider from './models/serviceProviderModel.js'
import ServiceCategory from './models/serviceCategoryModel.js'
import Service from './models/serviceModel.js'
import { Counter } from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

export const importData = async () => {
  try {
    const service = await Service.find({})
    for (let i = 0; i < service.length; i++) {
      const query = { serviceCategory: service[i]._id };
      const userCount = await ServiceProvider.countDocuments(query)
      await Service.findOneAndUpdate({ _id: service[i]._id }, { registrationNo: userCount })
    }
    const serviceCat = await ServiceCategory.find({})
    for (let i = 0; i < serviceCat.length; i++) {
      const query = { serviceCategory: serviceCat[i]._id };
      const userCount = await ServiceProvider.countDocuments(query)
      await ServiceCategory.findOneAndUpdate({ _id: serviceCat[i]._id }, { registrationNo: userCount })
    }
    await Counter.findByIdAndUpdate('userRegistrationCounter', { sequenceValue: users.length })
    
    const users = await User.find({})
    for (let i = 0; i < users.length; i++) {
      await User.findOneAndUpdate({ _id: users[i]._id }, { userType: 'personal' })
    }

    console.log('Data Imported!')
    // process.exit(0)
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