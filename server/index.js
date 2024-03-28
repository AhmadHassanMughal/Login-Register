const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post('/login', (req, res) => {
    // console.log(req)
    const { email, password } = req.body
    // console.log(email, password)
    EmployeeModel.findOne({ email: email })
        .then(user => {
            console.log(user)
            if (user) {
                if (user.password == password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record exits")
            }
        })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.json(err))
})


app.listen(3005, () => {
    console.log("server is running")
})