// importing express,cors and mongoose
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { MessModel } = require("./modules/mess")     // messmodule imported
const bcryptjs=require("bcryptjs")
const jwt = require("jsonwebtoken")
const { StaffModel } = require("./modules/staff")

//mongoose database link
mongoose.connect("mongodb+srv://salmanshan:salman642001@cluster0.odxej1b.mongodb.net/StudentMessDB?retryWrites=true&w=majority&appName=Cluster0")



//creating a variable app instead of express function.and data's should ne in json
const app = express()
app.use(cors())
app.use(express.json())

//creating hash function for generate hashed password
const GenerateHashedPassword = async (Password) => {
const salt=await bcryptjs.genSalt(10)
return bcryptjs.hash(Password,salt)
}

// creating SignUp API

app.post("/SignUp", async(req, res) => {
    let input = req.body
    // console.log(input)
    let HashedPassword= await GenerateHashedPassword(input.Password)
    console.log(HashedPassword)
    input.Password=HashedPassword
    const Mess = new MessModel(input)
    //console.log(Mess)
    Mess.save()
    res.json({ "status": "success" })
})

app.post("/SignIn",(req,res)=>{
    let input=req.body
    MessModel.find({"EmailId":req.body.EmailId}).then(
        (response)=>{
           if (response.length>0) {
            let dbPassword=response[0].Password
            console.log(dbPassword)
            bcryptjs.compare(input.Password,dbPassword,(error,isMatch)=>{
                if (isMatch) {
                    jwt.sign({ EmailId: input.EmailId }, "mess-app", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                               res.json({ "status": "unable to create token" })
                            } else {
                                res.json({ "status": "success", "userid": response[0]._id, "token": token })
                            }
                        }
                    )
                } else {
                    res.json({"status":"incorrect password"})
                    
                }
            })

           } else {
            res.json({satus:"user not found"})
            
           }
        }
    ).catch()

})



//Staff Signup
app.post("/StaffSignup",async(req,res)=>{
   let input = req.body
   let HashedPassword=await GenerateHashedPassword(input.StaffPassword)
    console.log(HashedPassword)
input.StaffPassword=HashedPassword
const Staff=new StaffModel(input)
Staff.save()
    res.json({"status":"success"})
    
})


//to view the server updates
app.listen(5050, () => {
    console.log("server running successfuly")
})