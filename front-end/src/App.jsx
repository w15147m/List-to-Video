import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNoAuthRequired from "./pages/Auth/AdminNoAuthRequired";
import ProtectedAdminRoutes from "./routes/AdminRequireAut";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/admin/Dashboard";

import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
