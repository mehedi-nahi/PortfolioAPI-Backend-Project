const portfolioModel = require('../models/portfolioModel.js');

//portfolio-create
exports.createPortfolio = async (req, res) => {
    try{
        let {title,img,link,category}=req.body;

        let data = await portfolioModel.create ({title,img,link,category})
        res.status(200).json({
            success: true,
            message: "Portfolio Created successfully",
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

// portfolio get all data
exports.allPortfolio = async (req, res) => {
    try{
        let data = await portfolioModel.find()

        return res.status(200).json({
            success: true,
            message: "Portfolio List",
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

// portfolio single data
exports.singlePortfolio = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await portfolioModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Single Portfolio",
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

// portfolio single data UPDATE
exports.updatePortfolio = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,institute,description,time}=req.body;
        let data = await portfolioModel.findByIdAndUpdate(
            id,
            {
                title,institute,description,time
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated Portfolio",
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

// portfolio delete
exports.deletePortfolio = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,institute,description,time}=req.body;
        let data = await portfolioModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted Portfolio",
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