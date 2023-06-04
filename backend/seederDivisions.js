import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import Division from './models/divisionModel.js'
import connectDB from './config/db.js'
import divisions from './data/divisions/divisions.js'

dotenv.config()

connectDB()

export const importData = async () => {
    try {
        await Division.deleteMany()

        // const createdUsers = await User.insertMany(users)

        // user id: 645d100c223ecc8539395f72
        // const adminUser = createdUsers[0]._id

        const sampleDivisions = divisions.map(e=>{
            return {
                user: "645d100c223ecc8539395f72",
                id: e.id,
                name:{
                    en: e.name,
                    bn: e.bn_name
                }
            }
            })

        await Division.insertMany(sampleDivisions)

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