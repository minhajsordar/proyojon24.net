import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

export const importData = async () => {
    try {
        await User.deleteMany()

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