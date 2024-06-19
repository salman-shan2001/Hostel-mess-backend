const mongoose = require("mongoose")
//created structure
const Schema=mongoose.Schema(
    {
        "Name":{type:String,require:true},                    
        "AdmissionNumber":{type:String,require:true},
        "Department":{type:String,require:true},
        "EmailId":{type:String,require:true},
        "Password":{type:String,require:true}
    }
)

const MessModel=mongoose.model("Students",Schema);
module.exports={MessModel}