const experienceModel = require('../models/experienceModel.js');

//experience-create
exports.createExperience = async (req, res) => {
    try{
        let {title,company,description,time}=req.body;

        let data = await experienceModel.create ({title,company,description,time})
        res.status(200).json({
            success: true,
            message: "Experience Created successfully",
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
exports.allExperience = async (req, res) => {
    try{
        let data = await experienceModel.find()

            return res.status(200).json({
                success: true,
                message: "Experience List",
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
exports.singleExperience = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await experienceModel.find()

        return res.status(200).json({
            success: true,
            message: "Single experience",
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
exports.updateExperience = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,company,description,time}=req.body;
        let data = await experienceModel.findByIdAndUpdate(
            id,
            {
                title,company,description,time
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated experience",
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
exports.deleteExperience = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,company,description,time}=req.body;
        let data = await experienceModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted experience",
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