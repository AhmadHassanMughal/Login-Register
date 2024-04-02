import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductsForm from "./forms/ProductsForm";
import EditProducts from "./editForms/EditProducts";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/products" element={<Products />}></Route>





        <Route path="/product/add" element={<ProductsForm />}></Route>


        <Route path="/product/edit" element={<EditProducts />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
