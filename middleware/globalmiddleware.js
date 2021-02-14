const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
dotenv.config();

async function globalMiddleware(req,res,next){
    
    req.header("Access-Control-Allow-Origin","*");
    req.header("Access-Control-Allow-Origin","http://localhost:8080");
    req.header("Access-Control-Allow-Methods: POST, GET, OPTIONS")
    req.header("Access-Control-Allow-Headers: X-PINGOTHER, Content-Type");
    next();  
}

module.exports = globalMiddleware;