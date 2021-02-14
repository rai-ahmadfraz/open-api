const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
dotenv.config();

async function verifyToken(req,res,next){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1];
    }
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.token_key);
            db.User.findOne({
                where:{
                    id:decoded.id
                }
            })
            .then(response=>{
                  req.user = response;
                   next();
            })
            
        }catch(err){
          res.send(err);
        }
    }
    else{
        res.send('token not provided');
    }
}

module.exports = verifyToken;