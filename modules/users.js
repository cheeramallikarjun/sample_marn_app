let mongoose=require('mongoose');
let userSchema=mongoose.Schema({
    name:String,
    emailid:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        enum:["HR","EMPLOYEE"]
    }
})
let users=mongoose.model('users',userSchema);
module.exports={users};