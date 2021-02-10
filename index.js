const express = require('express');
const db = require('./models');
const app = express();
const authControler = require('./controller/AuthController');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/login',authControler.login);
app.post('/register',authControler.register);

const verifyToken = require('./middleware/globalmiddleware');
app.use(verifyToken);

app.get('/test',(req,res)=>{
    res.send(req.user);
})

const port = process.env.PORT || 3000;

db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening at port ${port}`);
    })
})
