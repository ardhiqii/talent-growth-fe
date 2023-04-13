import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import { useContext } from "react";
import { AuthContext } from "./store/auth-contex";
import NotFound from "./pages/NotFound";
import Register from "./pages/register/Register";
function App() {
  const { token } = useContext(AuthContext);
  const protectedRoute = (
    <>
      <Route path="/homepage" element={<Homepage />} />
    </>
  );
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {token && protectedRoute}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
