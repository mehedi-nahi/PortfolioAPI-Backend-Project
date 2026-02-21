const advantageModel = require('../models/advantageModel.js');

//advantage-create
exports.createAdvantage = async (req, res) => {
    try{
        let {title,category,percent,time}=req.body;

        let data = await advantageModel.create ({title,category,percent,time})
        res.status(200).json({
            success: true,
            message: "One Advantage Created successfully",
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

// advantage get all data
exports.allAdvantage = async (req, res) => {
    try{
        let data = await advantageModel.find()

        return res.status(200).json({
            success: true,
            message: "advantage List",
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

// advantage single data
exports.singleAdvantage = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await advantageModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Single Advantage",
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

// advantage single data UPDATE
exports.updateAdvantage = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,category,percent,time}=req.body;
        let data = await advantageModel.findByIdAndUpdate(
            id,
            {
                title,category,percent,time
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated advantage",
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

// advantage delete
exports.deleteAdvantage = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,category,percent,time}=req.body;
        let data = await advantageModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted Advantage",
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