import expressAsyncHandler from "express-async-handler";
import CommonNotification from '../models/commonNotificationModel.js'

// @desc get notification
// @route Put api/notification
// @acess Privet
const getCommonNotifications = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 30;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.published ? {
        published: req.query.published
    } : {}
    const count = await CommonNotification.countDocuments({ ...keyword })
    const notifications = await CommonNotification.find({ ...keyword }).sort({ updatedAt: -1}).limit(pageSize).skip(pageSize * (page - 1))
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ notifications, page, pages: Math.ceil(count / pageSize) })
})

// @desc get notification
// @route Put api/notification
// @acess Public
const getAllCommonNotifications = expressAsyncHandler(async (req, res) => {
    const notifications = await CommonNotification.find({ ...keyword })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(notifications)
})

// @desc get notification by id
// @route Put api/notification/:id
// @acess Privet
const getCommonNotificationById = expressAsyncHandler(async (req, res) => {
    const commonNotifications = await CommonNotification.findById(req.params.id)
    if (notification) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(notification)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('CommonNotification not found')
    }
})

// @desc delete a notification
// @route Delete api/notification/:id
// @acess Privet/Admin
const deleteCommonNotification = expressAsyncHandler(async (req, res) => {
    const commonNotifications = await CommonNotification.findById(req.params.id)
    if (commonNotifications) {
        await commonNotifications.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'CommonNotification removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('CommonNotification not found')
    }
})

// @desc update a notification
// @route update api/notification/
// @acess Privet/Admin
const updateCommonNotification = expressAsyncHandler(async (req, res) => {
    const {
        title,
        description,
        published,
        link,
    } = req.body
    const commonNotifications = await CommonNotification.findById(req.params.id)
    if (commonNotifications) {
        commonNotifications.title = title
        commonNotifications.published = published
        commonNotifications.description = description
        commonNotifications.link = link
        const updatedCommonNotification = await commonNotifications.save()
        if(req.body.published){
            req.io.emit('push_new_notification', {...updatedCommonNotification })
        }
        res.status(201).json(updatedCommonNotification)
    } else {
        res.status(404)
        throw new Error('CommonNotification not found')
    }
})

// @desc create a notification
// @route create api/notification/
// @acess Privet/Admin
const createCommonNotification = expressAsyncHandler(async (req, res) => {
    if (req.body.title && req.body.description) {
        const commonNotifications = new CommonNotification({
            user: req.user._id,
            title: req.body.title,
            published: req.body.published,
            description: req.body.description,
            link: req.body.link,
        })
        const createdCommonNotification = await commonNotifications.save()
if(req.body.published){
    req.io.emit('push_new_notification', {...createdCommonNotification })
}
        res.status(201).json(createdCommonNotification)
    } else {
        res.status(404)
        throw new Error('Title or description not provided.')
    }
})

export {
    getCommonNotifications,
    getAllCommonNotifications,
    getCommonNotificationById,
    deleteCommonNotification,
    updateCommonNotification,
    createCommonNotification,
}
