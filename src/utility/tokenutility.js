const jwt =  require ("jsonwebtoken");

exports.EncodeToken = (email, _id) => {
    let key= process.env.JWT_KEY;
    let expire= process.env.JWT_Expire_Time;
    let payload= {email, _id};

    return jwt.sign(payload, key, {expiresIn: expire});
};

exports.DecodeToken = (token) => {
    let key= process.env.JWT_KEY;
    try {
        return jwt.verify(token, key);
    }
    catch (e) {
        return null;
    }
};