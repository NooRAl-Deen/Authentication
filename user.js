const mongoose=requrie('mongoose');
const schema=mongoose.schema;
const Joi=require('Joi');
const userSchema= new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password: {
type:String,
required:true
},
resetToken:string,
expireToken:Date
});

const User=mongoose.model("user",userSchema);
const validate=(user)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    });
    return schema.validate(user)
}

module.exports ={User,validate}