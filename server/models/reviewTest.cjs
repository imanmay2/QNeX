const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    testTitle:{
        type:String,
        required:true
    },
    test_id:{
        type:String,
        required:true
    },
    response:{
        type:[String],
        required:true
    },
    totalScore:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    attemptedOn:{
        type:String,
        required:true
    }
});

const ReviewTest=new mongoose.model("ReviewTest",userSchema);

module.exports=ReviewTest;