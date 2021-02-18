function globalMiddleware(req,res,next){

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers','Origin,Content-Type,X-Requested-With,Accept,Authorization');
    next();  
}

module.exports = globalMiddleware;