const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { EncodeToken } = require('../utility/tokenutility');

// Create
exports.register = async (req, res)=> {
    try {
        let {email, password}=req.body;
        let result = await userModel.create({email, password});

        res.status(201).json({
            success: true,
            data: result,
            message: "User registered successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            error: e.toString(),
            message: e.message
        })
    }
};

// Login
exports.login = async (req, res)=> {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email }) ;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Authentication failed. User not found."
            });
        }
        //isMatch Password
        let isMatch = await bcrypt.compare(password, user.password);

        if (isMatch){
            let token = EncodeToken (user.email,user._id.toString());

            let option= {
                maxAGE : process.env.Cookie_expire_Time,
                httpOnly: true,
                sameSite : "none",
                secure: true
            };

            //Set Cookie
            res.cookie("token",token,option);

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                },
            });

        }
        }
    catch(e) {
        res.status(500).json({
            success: false,
            error: e.toString(),
            message: e.message
        })
    }
};


// get USER
exports.user = async (req, res) => {
    try {

        let email = req.headers.email;

        let matchStage =  {
            $match: {
                email: email
            }
        }

        let project= {
            $project: {
                password: 0
        }
        }

        let result = await userModel.aggregate([matchStage, project]);

        res.status(200).json({
            success: true,
            data: result,
            message: "User retrieved successfully"
        });

} catch (e) {
        res.status(500).json({
            success: false,
            error: e.toString(),
            message: e.message
        })
    }
};

// Logout
exports.logout =(req,res)=> {
    try{
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            error: e.toString(),
            message: e.message
        })
    }
}