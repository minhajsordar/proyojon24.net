import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import Division from './models/divisionModel.js'
import District from './models/districtModel.js'
import connectDB from './config/db.js'
import districts from './data/districts/districts.js'
import fs from "fs"

dotenv.config()

connectDB()
let writer = fs.createWriteStream('test_gfg.json') 
export const importData = async () => {
    try {
        await District.deleteMany()

        // const createdUsers = await User.insertMany(users)

        // user id: 645d100c223ecc8539395f72
        // const adminUser = createdUsers[0]._id

        const divisions = await Division.find({})
        let datadis = []
        const sampleDistricts = districts.map(district => {
            let sampleDisBydiv = divisions.forEach((division) => {
                if (division.id == district.division_id) {
                    datadis.push({
                        user: "645d100c223ecc8539395f72",
                        id: district.id,
                        name: {
                            en: district.name,
                            bn: district.bn_name
                        },
                        parent: {
                            _id: division._id,
                            name: {
                                en: division.name.en,
                                bn: division.name.bn,
                            }
                        }
                    })
                }
            })
            // console.log(datadis)
            return sampleDisBydiv
        })

        // await District.insertMany(datadis)

        // console.log(datadis)
        writer.write(datadis)
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

// {
//     user: "645d100c223ecc8539395f72",
//     id: district.id,
//     name: {
//         en: district.name,
//         bn: district.bn_name
//     },
//     parent: {
//         _id: division._id,
//         name: {
//             en: division.name.en,
//             bn: division.name.bn,
//         }
//     }
// }