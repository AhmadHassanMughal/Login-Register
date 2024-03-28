const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    userName: String,
    name: String,
    email: String,
    password: Number,
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema)

module.exports = EmployeeModel;