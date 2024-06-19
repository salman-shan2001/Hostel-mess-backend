const mongoose=require("mongoose")
const Schema=mongoose.Schema(
    {
        "StaffId":{type:String,require:true},     
        "StaffName":{type:String,require:true},     
        "StaffMobileNo":{type:String,require:true},     
        "StaffEmailId":String,     
        "StaffPassword":{type:String,require:true}   
    }
)
const StaffModel = mongoose.model("staffs",Schema)
module.exports={StaffModel}