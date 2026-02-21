const serviceModel = require('../models/serviceModel.js');

//service-create
exports.createService = async (req, res) => {
    try{
        let {title,description,img}=req.body;

        let data = await serviceModel.create ({title,description,img})
        res.status(200).json({
            success: true,
            message: "service Created successfully",
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

// service get all data
exports.allService = async (req, res) => {
    try{
        let data = await serviceModel.find()

        return res.status(200).json({
            success: true,
            message: "service List",
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

// service single data
exports.singleService = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await serviceModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "single service",
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

// service single data UPDATE
exports.updateService = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,description,img}=req.body;
        let data = await serviceModel.findByIdAndUpdate(
            id,
            {
                title,description,img
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "updated service",
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

// service delete
exports.deleteService = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,description,img}=req.body;
        let data = await serviceModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted service",
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