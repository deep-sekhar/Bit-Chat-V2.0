// DOT ENV 
const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); 

// ACCESS MONGOOSE 
require('./db/conn')
const Entries = require('./model/userSchema')

// EXPRESS SPECIFIC STUFF
const express = require('express');
const app = express();
const path = require('path');
const port =process.env.PORT || 8000;

// EXPRESS STATIC FILES  
if(process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'));
    // app.get("*",(REQ,RES)=>{
    //     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    // })
}

// PARSE THE INCOMING FILES
app.use(express.json()) 
// app.use(express.urlencoded({ extended: true }));

// NOT USED IN PROJECT 
// const bodyparser = require('body-parser');
// const fs = require('fs');

// COOKIE PARSER 
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//EASY ROUTING WITH EXPRESS ROUTER
app.use(require('./router/auth'))

// PUG SPECIFIC STUFF --- NOT USED HERE
// app.set('view engine', 'pug') 
// app.set('views', path.join(__dirname, 'views')) 

// ENDPOINTS -- DIVERTED TO EXPRESS ROUTER HERE
// in router itself 

// ----PUG END POINTS NOT USED TOLD ABOVE----
// app.get('/contact', (req, res)=>{
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })

// app.get('/about', (req, res)=>{
//     const params = {}
//     res.status(200).render('aboutus.pug', params);
// })

// app.post('/contact',(req,res)=>{
//     var stuContact = new Entries(req.body);
//     stuContact.save().then(()=>{
//         res.status(200).send("Data saved to data base");
//     }).catch(error =>res.status(404).send("Error occured"))
// })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
