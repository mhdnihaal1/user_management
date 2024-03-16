const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }, 
 //   image:{
 //       type:String,
 //       required:true
  //  },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },
    is_verified:{
        type:Number,
        default:0
    }
});
module.exports = mongoose.model('user',userschema)