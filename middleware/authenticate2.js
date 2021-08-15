//MONGOOSE CODE
require('../db/conn')
const Entries = require('../model/userSchema')

// JWT TOKENS 
const jwt = require('jsonwebtoken')

const authenticate2 = async (req, res,next) => {
    try {
        // ACCESS TOKENS 
        // console.log(req.cookies.DeepToken)
        const token = req.cookies.DeepToken;
        // VERIFY IT 
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        // FIND MATCH
        const rootUser = await Entries.findOne({_id:verifyToken._id,"tokens.token":token})
        // IF NOT A VERIFIED USER 
        if (!rootUser) {
            throw new error('User Not Found')
        }

        // TAKE OTHER MESSAGES ALSO IN THIS AUTHENTICATE CALL
        let others = await Entries.find({email:{$not:{$regex:rootUser.email}}},{messages:1});
        if(others) 
        {
            others = others.filter(data=> (data.messages.length>0)).map(data=>{return data.messages})
            // console.log(others);
            
            if (others.length>0) others = others.reduce((prev,cur)=>prev.concat(cur))
            // else others = [];
        }
        else {throw new error('Other Users Not Found')}
        
        req.others = {messages:others};
        req.token = token;
        req.rootUser = rootUser; 
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).json({Unauthorizedaccess:"NO token"})
        console.log(error);
    }
}

module.exports = authenticate2;
