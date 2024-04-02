const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")
const ProductModel = require("./models/Product")

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

app.get('/allProduct', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})
app.post('/addProduct', (req, res) => {
    ProductModel.create(req.body)
    .then(product => res.json(product))
    .catch(err => res.json(err))
})

app.post('/updateProduct/:id', async (req, res) => {
    console.log(req.params )
    try{
        const id = req.params.id
        console.log(id, 'edit id in server')
        const updateData = req.body
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({ message: 'Product Updated Successfully', data: updatedProduct})
    }catch(err){
        res.status(500).json({ error : err.message})
    }
})

app.post('/getProduct/:id', async (req, res) => {
    console.log(req.params)
    try{
        const id = req.params.id
        const productById = await ProductModel.findById(id)
        if(!productById){
            res.status(404).json({ error: 'product not found'});
        }
        res.json(productById)
    }catch(err){
        res.status(500).json({ error : err.message})
    }
})

app.delete('/deleteProduct/:id', async (req, res) => {
    try{
        const productId = req.params.id;
        const deleteProduct = await ProductModel.findByIdAndDelete(productId)
        if(!deleteProduct) {
            return res.status(404).json({error : 'Product not found'})
        }
        res.json(deleteProduct)
    }catch (err) {
        res.status(500).json({ error: err.message})
    }
})


app.listen(3005, () => {
    console.log("server is running")
})