const blogModel = require('../models/blogModel.js');
const mongoose = require('mongoose');

//blog-create
exports.createBlog = async (req, res) => {
    try{
        let {title,category,img,shortDescription,description}=req.body;

        let data = await blogModel.create ({title,category,img,shortDescription,description})
        res.status(200).json({
            success: true,
            message: "One blog Created successfully",
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

// blog get all data
exports.allBlog = async (req, res) => {
    try{

        let pageNo =Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);

        let skipRow = (pageNo - 1) * perPage;

        let sortStage={createdAt: -1}

        let faceStage = {
            $facet: {
                totalCount : [{$count: 'count'}],
                blogs : [
                    {
                        $sort : sortStage
                    },
                    {
                        $skip : skipRow
                    },
                    {
                        $limit : perPage
                    },
                    {
                        $project : { title: 1 ,img: 1, category:1, shortDescription:1}
                    }
                ]
            }
        }

        let blogs= await blogModel.aggregate([faceStage]);
         console.log (blogs);
        return res.status(200).json({
            success: true,
            message: "BLOG List",
            data: blogs
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

// blog single data
exports.singleBlog = async (req, res) => {
    try{
        let {id}=req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }

        let matchStage = {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        };

        let joinStage ={
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'blogId',
                as: 'comments'
            }
        }

        let project = {
            $project: {
                title: 1,
                category: 1,
                img: 1,
                shortDescription: 1,
                description: 1,
                comments: 1,
                createdAt: 1
            }
        }

        let data = await blogModel.aggregate([matchStage, joinStage, project]);

        return res.status(200).json({
            success: true,
            message: "Single Blog retrieved successfully",
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

// blog single data UPDATE
exports.updateBlog = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,category,img,shortDescription,description}=req.body;
        let data = await blogModel.findByIdAndUpdate(
            id,
            {
                title,category,img,shortDescription,description
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Updated Blog",
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

// blog delete
exports.deleteBlog = async (req, res) => {
    try{
        let {id}=req.params;
        let {title,category,img, shortDescription, description}=req.body;
        let data = await blogModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted blog",
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