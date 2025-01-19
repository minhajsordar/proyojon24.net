import expressAsyncHandler from "express-async-handler";
import OurBusinessPartners from '../models/ourBusinessPartnersModel.js'
import TitleSubTitle from '../models/titleSubTitleModel.js'

// @desc get ourBusinessPartners
// @route Put api/ourBusinessPartners
// @acess Privet
const getOurBusinessPartners = expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 30;
    const page = Number(req.query.pageNumber) || 1;
    const count = await OurBusinessPartners.countDocuments({ })
    const ourBusinessPartners = await OurBusinessPartners.find({ }).limit(pageSize).skip(pageSize * (page - 1))
    const titleSubTitles = await TitleSubTitle.find({ })
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(200).json({ ourBusinessPartners,ourBusinessPartnerTitle : titleSubTitles.length == 0 ? null : titleSubTitles[0]?.ourBusinessPartnerTitle, page, pages: Math.ceil(count / pageSize) })
})

// @desc get ourBusinessPartners by id
// @route Put api/ourBusinessPartners/:id
// @acess Privet
const getOurBusinessPartnerById = expressAsyncHandler(async (req, res) => {
    const ourBusinessPartner = await OurBusinessPartners.findById(req.params.id)
    if (ourBusinessPartner) {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json(ourBusinessPartner)
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('OurBusinessPartners not found')
    }
})

// @desc delete a ourBusinessPartners
// @route Delete api/ourBusinessPartners/:id
// @acess Privet/Admin
const deleteOurBusinessPartner = expressAsyncHandler(async (req, res) => {
    const ourBusinessPartner = await OurBusinessPartners.findById(req.params.id)
    if (ourBusinessPartner) {
        await ourBusinessPartner.deleteOne()
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.json({ message: 'OurBusinessPartner removed' })
    } else {
        // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.status(404)
        throw new Error('OurBusinessPartner not found')
    }
})

// @desc update a ourBusinessPartners
// @route update api/ourBusinessPartners/
// @acess Privet/Admin
const updateOurBusinessPartner = expressAsyncHandler(async (req, res) => {
    const {
        name,
        subTitle,
        image,
    } = req.body
    const ourBusinessPartner = await OurBusinessPartners.findById(req.params.id)
    if (ourBusinessPartner) {
        ourBusinessPartner.name = name
        ourBusinessPartner.subTitle = subTitle
        if((image !== '') && (image !== null)){
            ourBusinessPartner.image = image
        }
        const updatedOurBusinessPartner = await ourBusinessPartner.save()
        res.status(201).json(updatedOurBusinessPartner)
    } else {
        res.status(404)
        throw new Error('OurBusinessPartners not found')
    }
})

// @desc update a ourBusinessPartners
// @route update api/ourBusinessPartners/
// @acess Privet/Admin
const updateOurBusinessPartnerSectionTitle = expressAsyncHandler(async (req, res) => {
    const {
        ourBusinessPartnerTitle
    } = req.body
    const ourBusinessPartne = await TitleSubTitle.find({})
    if(ourBusinessPartne.length == 0 ){
        const updatedOurBusinessPartner = await TitleSubTitle.create({
            ourBusinessPartnerTitle
        })
        res.status(201).json(updatedOurBusinessPartner)
    }
    else{
        console.log(ourBusinessPartne)
        const ourBusinessPartnerTitles = await TitleSubTitle.findById({_id: ourBusinessPartne[0]._id})
        if (ourBusinessPartnerTitles) {
            ourBusinessPartnerTitles.ourBusinessPartnerTitle = ourBusinessPartnerTitle
            const updatedOurBusinessPartner = await ourBusinessPartnerTitles.save()
            res.status(201).json(updatedOurBusinessPartner)
        } else {
            res.status(404)
            throw new Error('OurBusinessPartners not found')
        }
    }
})

// @desc create a ourBusinessPartners
// @route create api/ourBusinessPartners/
// @acess Privet/Admin
const createOurBusinessPartner = expressAsyncHandler(async (req, res) => {
    const {
        name,
        subTitle,
        image,
    } = req.body
    if (
        name &&
        subTitle &&
        image
    ) {
        const ourBusinessPartners = new OurBusinessPartners({
            createdBy: req.user._id,
            name: name,
            subTitle: subTitle,
            image: image,
        })
        const createdOurBusinessPartners = await ourBusinessPartners.save()
        res.status(201).json(createdOurBusinessPartners)
    } else {
        res.status(404)
        throw new Error('Please provide name, subTitle, and image')
    }
})

export {
    getOurBusinessPartners,
    getOurBusinessPartnerById,
    deleteOurBusinessPartner,
    updateOurBusinessPartner,
    createOurBusinessPartner,
    updateOurBusinessPartnerSectionTitle
}
