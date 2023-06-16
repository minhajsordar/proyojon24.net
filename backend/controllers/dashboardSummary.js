import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import ServiceProvider from '../models/serviceProviderModel.js'

const userDashboardData = expressAsyncHandler(async (req, res) => {
  let totalUser = await User.countDocuments({})
  let profileView = await ServiceProvider.find({})
  let totalView = profileView.reduce((a,c)=>a+c.viewCount,0)
      res.status(200)
      res.json({totalUser, totalView})
})

export {
  userDashboardData,
}