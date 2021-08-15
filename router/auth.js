// EXPRESS SET UP 
const express = require('express');
const router = express.Router();

// AUTHENTICATION 
const authenticate = require('../middleware/authenticate');
const authenticate2 = require('../middleware/authenticate2');

// BCRYPT FOR REVERSE HASH
const bcrypt =require('bcryptjs');

// JWT TOKENS 
const jwt = require('jsonwebtoken')

//MONGOOSE CODE
require('../db/conn')
const Entries = require('../model/userSchema')

// ROUTINGS 
router.get('/profiledata',authenticate, (req, res)=>{
    // console.log(req.rootUser);
    res.status(200).send(req.rootUser);
})

router.get('/userview',authenticate,(req, res)=>{
    res.status(200).send(req.rootUser);
})

router.get('/dashview',authenticate2, (req, res)=>{
    // console.log(req.others);
    res.status(200).json(req.others);
})

router.post('/addMsg',authenticate, async (req, res)=>{
    try {
        const {name, post_time, title,con,likes,dislikes}=req.body;
        if(!post_time||!title||!con||!name)
        {
            console.log("probelmmmmmmmmmm");
            console.log(name);
            console.log(post_time);
            console.log(title);
            console.log(con);
            console.log(likes);
            
            return res.status(422).json({error:"not filled properly"})
        }
        const userContact = await Entries.findOne({_id:req.userId});
        if(userContact)
        {
            const userMessage = await userContact.addMsg(name, post_time,title,con,likes,dislikes);
            // SAVING AGAIN --- OPTIONAL 
            await userContact.save();
            return res.status(201).send(userContact);
        }
        else{
            throw new Error('not done')
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({error:"error occurred"})
    }
})

router.post('/delMsg',authenticate, async (req, res)=>{
    try {
        const {index}=req.body;
        if(index<0)
        res.status(422).json({error:"blank id"})
        const userContact = await Entries.findOne({_id:req.userId});
        if(userContact)
        {
            const userDelMessage = await userContact.delMsg(index);
            // SAVING AGAIN --- OPTIONAL
            await userContact.save();
            res.status(201).send(userContact);
        }
    } catch (error) {
        console.log(error);
        res.status(422).json({error:"error occurred"})
    }
})

router.post('/addLikes',authenticate, async (req, res)=>{
    try {
        const {index}=req.body;
        if(index<0)
        res.status(422).json({error:"blank id"})
        const userContact = await Entries.findOne({_id:req.userId});
        if(userContact)
        {
            const useraddLikes= await userContact.addLikes(index);
            // SAVING AGAIN --- OPTIONAL
            await userContact.save();
            res.status(201).send(userContact);
        }
    } catch (error) {
        console.log(error);
        res.status(422).json({error:"error occurred"})
    }
})

router.post('/adddisLikes',authenticate, async (req, res)=>{
    try {
        const {index}=req.body;
        if(index<0)
        res.status(422).json({error:"blank id"})
        const userContact = await Entries.findOne({_id:req.userId});
        if(userContact)
        {
            const useraddLikes= await userContact.adddisLikes(index);
            // SAVING AGAIN --- OPTIONAL
            await userContact.save();
            res.status(201).send(userContact);
        }
    } catch (error) {
        console.log(error);
        res.status(422).json({error:"error occurred"})
    }
})

router.get('/userSignout',(req,res)=>{
    res.clearCookie('DeepToken',{ path:'/'});
    res.status(200).send("User Logout")
})

router.post('/signup',async (req,res)=>{
    // console.log(req.body);
    const {username, email, phno,password,cpassword} = req.body;
    
    try{
        if((!username||!email||!phno||!password||!cpassword)||(password!=cpassword))
        {
            return res.status(422).json({
                error:"Not filled properly"
            })
        }

        const userExist = await Entries.findOne({email:email})   
        if(userExist)
        return res.status(422).json({
            error:"Already exists"
        });

        const NewUser = new Entries({username, email, phno,password,cpassword});
        // HASHING DONE IN USER SCHEMA FILE
        await NewUser.save();
    
        res.status(201).json({message: "Saved succesfully!"})

    }catch(err){
        console.log(err)
    }
})

router.post('/signin',async (req,res)=>{

    // res.status(200).json({msg:"wao"})
    const {email,password} = req.body;
    try{

        if(!email||!password)
        {
            return res.status(422).json({
            error:"Fill all entries"
            })
        }

        const userExist = await Entries.findOne({email:email});
        if(userExist)
        {  
            // PS HASHING MATCH 
            const psMatch = await bcrypt.compare(password,userExist.password);

            
            if(psMatch)
            {
                // TOKEN GENERATE 
                const token = await userExist.generateAuthToken();
    
                // GENERATE COOKIE FROM TOKENS
                res.cookie("DeepToken",token,{
                    expires: new Date(Date.now() + 86400000),
                    httpOnly:true
                });

                // console.log(userExist);
                return res.status(200).json({error:"Sign in successful"});
            }
            else{
                return res.status(400).json({error:"Invalid Credentials"});
            }
        }
        else{
            return res.status(400).json({error:"Invalid Credentials"});
        }

    }catch(err){
        console.log(err)
    }
})

module.exports = router;