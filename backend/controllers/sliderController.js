import expressAsyncHandler from "express-async-handler";
import Slider from '../models/sliderModel.js'

// @desc get sliders
// @route Get api/sliders
// @acess Public
const getSlider =  expressAsyncHandler(async (req, res) => {
    const sliders = await Slider.find({})
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json(sliders)
})

// @desc get slider by id
// @route Get api/sliders/:id
// @acess Privet
const getSliderById = expressAsyncHandler(async (req, res) => {
    const slider = await Slider.findById(req.params.id)
    if (slider) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(slider)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('slider not found')
    }
})

// @desc update a slider
// @route put api/sliders/
// @acess Privet/Admin
const updateSlider = expressAsyncHandler(async (req, res) => {
    const {
        slider1,
        slider2,
        slider3,
        slider4
    } = req.body
    const sliders = await Slider.findById(req.params.id)
    if(sliders){
        if(slider1){
            sliders.slider1 = slider1.filter(e=>(e != null && e!= ""))
        }
        if(slider2){
            sliders.slider2 = slider2.filter(e=>(e != null && e!= ""))
        }
        if(slider3){
            sliders.slider3 = slider3.filter(e=>(e != null && e!= ""))
        }
        if(slider4){
            sliders.slider4 = slider4.filter(e=>(e != null && e!= ""))
        }
        const updatedSlider = await sliders.save()
        res.status(201).json(updatedSlider)
    }else{
        res.status(404)
        throw new Error('slider not found')
    }
})

// @desc create a slider
// @route create api/sliders/
// @acess Privet/Admin
const createSlider = expressAsyncHandler(async (req, res) => {
    if (req.body.slider1 ||
        req.body.slider2 ||
        req.body.slider3 ||
        req.body.slider4
        ) {
        const sliders = new Slider({
            user: req.user._id,
            slider1: req.body.slider1,
            slider2: req.body.slider2,
            slider3: req.body.slider3,
            slider4: req.body.slider4,
        })
        const createdslider = await sliders.save()
        res.status(201).json(createdslider)
    } else {
        res.status(404)
        throw new Error('Parent Union not found')
    }
})

export {
    getSlider,
    getSliderById,
    updateSlider,
    createSlider
}
