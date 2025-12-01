import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layout/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Product from "./components/product";
import ProductDetails from "./components/product_details";
import ProductCategory from "./components/product_category";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:category" element={<ProductCategory />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
