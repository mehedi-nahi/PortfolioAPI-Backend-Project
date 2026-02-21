const commentModel = require('../models/commentModel.js');

//comment-create
exports.createComment = async (req, res) => {
    try{
        let {blogID,name,email,comment}=req.body;

        let data = await commentModel.create ({blogID,name,email,comment})
        res.status(200).json({
            success: true,
            message: "One comment Created successfully",
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

// comment get all data
exports.allComment= async (req, res) => {
    try{

        let data= await commentModel.find();

        return res.status(200).json({
            success: true,
            message: "Comment List",
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

// comment single data
exports.singleComment = async (req, res) => {
    try{
        let {id}=req.params;
        let data = await commentModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Single Comment",
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


// comment delete
exports.deleteComment= async (req, res) => {
    try{
        let {id}=req.params;
        let {blogID,name,email,comment}=req.body;
        let data = await commentModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted comment",
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