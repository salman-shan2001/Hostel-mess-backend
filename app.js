// importing express,cors and mongoose
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { MessModel } = require("./modules/mess")     // messmodule imported
const bcryptjs=require("bcryptjs")

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


//to view the server updates
app.listen(5050, () => {
    console.log("server running successfuly")
})