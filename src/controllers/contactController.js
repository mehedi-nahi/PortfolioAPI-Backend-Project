const contactModel = require('../models/contactModel.js');

//experience-create
exports.createContact = async (req, res) => {
    try{
        let {name,email,website,message}=req.body;

        let data = await contactModel.create ({name,email,website,message})
        res.status(200).json({
            success: true,
            message: "Contact Created successfully",
            data,
        });

    }
    catch(err){
        return res.status(400).json({
            success: false,
            err: err.toString(),
            message: err.message,

        });
    }
}

// experience get all data
exports.allContact= async (req, res) => {
    try{
        let data = await contactModel.find()

        return res.status(200).json({
            success: true,
            message: "Contact List",
            data: data
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            err: e.toString(),
            message: e.message,
        })
    }
}

// experience single data
exports.singleContact = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await contactModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Single Contact",
            data: data
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            err: e.toString(),
            message: e.message,
        })
    }
}

// experience single data UPDATE
exports.updateContact = async (req, res) => {
    try{
        let {id}=req.params;
        let {name,email,website,message}=req.body;
        let data = await contactModel.findByIdAndUpdate(
            id,
            {
                title,institute,description,time
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated Contact",
            data: data
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            err: e.toString(),
            message: e.message,
        })
    }
}

// experience delete
exports.deleteContact = async (req, res) => {
    try{
        let {id}=req.params;
        let {name,email,website,message}=req.body;
        let data = await contactModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted Contact",
            data: data
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            err: e.toString(),
            message: e.message,
        })
    }
}