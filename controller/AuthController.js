const Joi = require('joi');
const bcryt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req,res)=>{

    const schema = Joi.object({
        password:Joi.required()
    }).options({allowUnknown:true});

    const {error} = schema.validate(req.body);
    if(error){
        res.send(error.details[0].message);
    }
    else{
            
        const is_user_exists = await db.User.findOne({
            where:{email:req.body.email}
        });
        if(is_user_exists){
           res.send("Email already exists");
        }
        else
        {
            const password = await bcryt.hash(req.body.password,10);
            db.User.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                password:password
            }).then(response =>{
                res.send(response);
            }).catch(err =>{
                res.send(err.errors[0].message);
            });
    }
    }
}

exports.login = async (req,res)=>{

    const schema = Joi.object({
        email:Joi.required(),
        password:Joi.required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        res.send(error.details[0].message);
    }
    else{

        db.User.scope('withPassword').findOne({
            where:{email:req.body.email}
        }).then(response=>{
            if(response){
            bcryt.compare(req.body.password,response.password).then(result =>{
                if(result){
                    const token = jwt.sign({id:response.id},process.env.token_key,{expiresIn:'24h'});
                    const user = {
                        first_name:response.first_name,
                        last_name:response.last_name,
                        email:response.email,
                        avatar:response.avatar,
                        token:token
                    }
                    res.send(user);
                }else{
                    res.send('Incorrect password');
                }
            })
            }
            else{
                res.send('Email does not exists');
            }
        })
        
    }

}