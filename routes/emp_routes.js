let express=require('express');
let router=express.Router()
let {users} =require('../models/users');

let bcrypt=require('bcrypt');
router.post("/register",async (req,res)=>{
    let data=req.body;    
    data.password=await bcrypt.hash(data.password,10);

    let newuser=new users(data);
    let result=await newuser.save();
    res.send(result);
})

router.post("/login",async (req,res)=>{
    let data=req.body;
    let emailcheck=await users.findOne({emailid:data.emailid})
    if(emailcheck){
let passcheck=await bcrypt.compare(data.password,emailcheck.password);
     if(passcheck){
        res.send("login successfull");
     }else{
        res.send("password wrong")
     }
    }else{
        res.send("user not found");
    }
})

router.get("/viewtask",(req,res)=>{
    res.send("viewtask router called");
})

router.patch("/updateprofile/:id",async (req,res)=>{
    let data=req.body;
    if(data.password){
        data.password=await bcrypt.hash(data.password,10);
    }
    let result=await users.findByIdAndUpdate(req.params.id,
        {$set:data},{new:true});
    res.send(result)
})
module.exports=router;
