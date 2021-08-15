// MONGOOSE SCHEMA
const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
username: {
        type:String,
        required:true
        },
email: {
        type:String,
        required:true
        },
phno: {
        type:Number,
        required:true
        },
password: {
        type:String,
        required:true
        },
cpassword: {
        type:String,
        required:true
        },
messages:[
        {       name:{type:String,
                     },
                post_time:{
                        type:String,
                        required:true
                },
                title:{
                        type:String,
                        required:true
                },
                con:{
                        type:String,
                        required:true
                },
                likes: {
                        type:Number,
                        required:true
                        },
                dislikes: {
                        type:Number,
                        required:true
                        }
        }
        ],
tokens:[
        {
                token:{
                        type:String,
                        required:true
                }
        }
        ]
});

// HASHING PASSWORD BEFORE MAKING AND EXPORING MODEL
const bcrypt = require('bcryptjs');
userSchema.pre('save', async function(next){
        if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.password,12);
        }
        next();
})

// JWT TOKEN GENERATE   
const jwt = require('jsonwebtoken')
userSchema.methods.generateAuthToken = async function(){
        try{
                let Newtoken = jwt.sign({_id:this.id},process.env.SECRET_KEY);
                this.tokens = this.tokens.concat({token:Newtoken});
                await this.save();
                // console.log(Newtoken);
                return Newtoken;
        }catch(err){
                console.log(err);
        }
}

// ADD MESSAGES 
userSchema.methods.addMsg = async function(name, post_time,title,con,likes,dislikes){
        try{
        this.messages = this.messages.concat({name,post_time,title,con,likes,dislikes});
        await this.save();
        return title;
        }catch(err){
                console.log(err);
        }
}

// DELETE MESSAGES 
userSchema.methods.delMsg = async function(index){
        try{
        console.log(index);
        this.messages.splice(index,1);
        await this.save();
        return index;
        }catch(err){
                console.log(err);
        }
}

// ADD LIKES
userSchema.methods.addLikes = async function(index){
        try{
        this.messages[index].likes=this.messages[index].likes+1;
        await this.save();
        return index;
        }catch(err){
                console.log(err);
        }
}

// ADD DISLIKES 
userSchema.methods.adddisLikes = async function(index){
        try{
        this.messages[index].dislikes=this.messages[index].dislikes+1;
        await this.save();
        return index;
        }catch(err){
                console.log(err);
        }
}

// CREATE MODEL AND EXPORT 
const Entries = mongoose.model('userdetails', userSchema);

module.exports = Entries;