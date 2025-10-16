import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNoAuthRequired from "./pages/Auth/AdminNoAuthRequired";
import ProtectedAdminRoutes from "./routes/AdminRequireAut";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import { default as ShowCategories } from "./pages/admin/categories/Show";
import { default as CreateCategories } from "./pages/admin/categories/Form";
import { default as ShowBrands } from "./pages/admin/brands/Show"; // New Import
import { default as CreateBrands } from "./pages/admin/brands/Form"; 
import { default as ShowProducts } from "./pages/admin/products/Show"; // New Import
import { default as CreateProducts } from "./pages/admin/products/Form"; // New Import
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test" element={<Test />} />

        <Route
          path="/admin/login"
          element={
            <AdminNoAuthRequired>
              <Login />
            </AdminNoAuthRequired>
          }
        />
        <Route path="/admin" element={<ProtectedAdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
           {/* Categories Routes */}
          <Route path="categories" element={<ShowCategories />} />
          <Route path="categories/create" element={<CreateCategories />} />
          {/* Brands Routes (Added) */}
          <Route path="brands" element={<ShowBrands />} />
          <Route path="brands/create" element={<CreateBrands />} />
           {/* Products Routes (Added) */}
          <Route path="products" element={<ShowProducts />} />
          <Route path="products/create" element={<CreateProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
