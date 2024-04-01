import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductsForm from "./forms/ProductsForm";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/products" element={<Products />}></Route>





        <Route path="/new/product" element={<ProductsForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
