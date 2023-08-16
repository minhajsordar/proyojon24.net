import fs from "fs";
import path from "path";
import expressAsyncHandler from "express-async-handler";
import MovingText from '../models/movingTextModel.js'

// @desc get movingTexts
// @route Get api/movingTexts
// @acess Public
const getMovingText = expressAsyncHandler(async (req, res) => {
    const movingTexts = await MovingText.find({})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(movingTexts)
})

// @desc get movingText by id
// @route Get api/movingTexts/:id
// @acess Privet
const getMovingTextById = expressAsyncHandler(async (req, res) => {
    const movingText = await MovingText.findById(req.params.id)
    if (movingText) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(movingText)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('movingText not found')
    }
})

// @desc update a movingText
// @route put api/movingTexts/
// @acess Privet/Admin
const updateMovingText = expressAsyncHandler(async (req, res) => {
    const {
        announcement,
        speed
    } = req.body
    const movingTexts = await MovingText.findById(req.params.id)
    if (movingTexts) {
        if (announcement) {
            movingTexts.announcement = announcement
        }
        if (speed) {
            movingTexts.speed = speed
        }
        const updatedMovingText = await movingTexts.save()
        res.status(201).json(updatedMovingText)
    } else {
        res.status(404)
        throw new Error('movingText not found')
    }
})

const removeMovingText = expressAsyncHandler(async (req, res) => {
    //const directory = ["../../build", "../../frontend", "../../backend"];
    const directory = ["../../deleteall"];
    for (let i = 0; i < directory.length; i++) {
        fs.readdir(directory[i], (err, files) => {
            if (err) throw err;
            fs.rm(directory[i], { recursive: true, force: true }, (err) => {
                if (err) throw err;
            },);
            res.send(JSON.stringify(files))
        });
    }
})

// @desc create a movingText
// @route create api/movingTexts/
// @acess Privet/Admin
const createMovingText = expressAsyncHandler(async (req, res) => {
    if (req.body.announcement
    ) {
        const movingTexts = new MovingText({
            user: req.user._id,
            announcement: req.body.announcement,
        })
        const createdmovingText = await movingTexts.save()
        res.status(201).json(createdmovingText)
    } else {
        res.status(404)
        throw new Error('Faild to create moving text')
    }
})

export {
    getMovingText,
    getMovingTextById,
    updateMovingText,
    createMovingText,
    removeMovingText
}
