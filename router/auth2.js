const express = require('express');
const router = express.Router();

//MONGOOSE CODE
require('../db/conn')
const Entries = require('../model/userSchema')

router.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
router.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
router.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('aboutus.pug', params);
})
router.post('/contact',(req,res)=>{

    // console.log(req.body);
    const {name, age, address} = req.body;
    if(!name||!age||!address)
    {
        return res.status(422).json({
            "error":"not filled properly"
        })
    }
    
    Entries.findOne({address:address}).then((userExist)=>{
        if(userExist)
        return res.status(422).json({
            "error":"Already exists"
        });

        const NewUser = new Entries({name, age, address});
        NewUser.save().then(()=>res.status(200).json({message: "saved succesfully!"})).catch(err=>res.status(500).json({message: "saved succesfully!"}))
    }).catch(err=>console.log(err))

    // res.json({"mes":req.body});
})

module.exports = router;