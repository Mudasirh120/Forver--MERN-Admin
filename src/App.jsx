import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import { useEffect, useState } from "react";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import Edit from "./Pages/Edit";
import api from "./Utils/axios.js";
function App() {
  const [token, setToken] = useState(false);
  const checkAuth = async () => {
    const res = await api.post("/api/user/check-admin");
    setToken(res.data.success);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === false ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} />
          <hr className="border-gray-200" />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/list" element={<List token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/edit/:id" element={<Edit token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
