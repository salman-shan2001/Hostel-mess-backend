// importing express,cors and mongoose
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { MessModel } = require("./modules/mess")     // messmodule imported


//mongoose database link
mongoose.connect("mongodb+srv://salmanshan:salman642001@cluster0.odxej1b.mongodb.net/StudentMessDB?retryWrites=true&w=majority&appName=Cluster0")



//creating a variable app instead of express function.and data's should ne in json
const app = express()
app.use(cors())
app.use(express.json())

// creating SignUp API

app.post("/SignUp", (req, res) => {
    let input = req.body
    // console.log(input)
    const Mess = new MessModel(input)
    console.log(Mess)
    Mess.save()
    res.json({ "status": "success" })
})

app.post("/SignIn", (req, res) => {
    let input = req.body
    MessModel.find({ "EmailId": req.body.EmailId }).then(
        (response) => {
            if (response.length > 0) {
                let dbpassword = response[0].Password
                console.log(dbpassword)
                bcrypt.compare(input.Password, dbpassword, (error, isMatch) => {
                    if(isMatch) {
                        res.json({"status": "success","userid":response[0]._id})
                    }
                    else
                    {
                        res.json({"status":"incorrect pw"})
                    }
                })
            } else {
                res.json({ "status": "user not found" })
            }
        }
    ).catch()
})

//to view the server updates
app.listen(5050, () => {
    console.log("server running successfuly")
})