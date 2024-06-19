const mongoose = require("mongoose")
//created structure
const Schema=mongoose.Schema(
    {
        "Name":String,                    
        "AdmissionNumber":String,
        "Department":String,
        "EmailId":{type:String,require:true},
        "Password":{type:String,require:true}
    }
)

const MessModel=mongoose.model("Students",Schema);
module.exports={MessModel}