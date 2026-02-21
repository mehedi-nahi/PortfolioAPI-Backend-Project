const educationModel = require('../models/educationModel.js');

//education-create
exports.createEducation = async (req, res) => {
    try{
        let {title,institute,description,time}=req.body;

        let data = await educationModel.create ({title,institute,description,time})
        res.status(200).json({
            success: true,
            message: "Education Created successfully",
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

// education get all data
exports.allEducation = async (req, res) => {
    try{
        let data = await educationModel.find()

        return res.status(200).json({
            success: true,
            message: "Education List",
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

// education single data
exports.singleEducation = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await educationModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Single Education",
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

// education single data UPDATE
exports.updateEducation = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,institute,description,time}=req.body;
        let data = await educationModel.findByIdAndUpdate(
            id,
            {
                title,institute,description,time
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated education",
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

// education delete
exports.deleteEducation = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,institute,description,time}=req.body;
        let data = await educationModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted education",
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