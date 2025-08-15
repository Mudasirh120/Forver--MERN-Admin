import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import api from "../Utils/axios.js";

function NavBar({ setToken }) {
  const onSubmitHandler = async () => {
    const res = await api.post("/api/user/logout");
    if (res.data.success) setToken(false);
  };
  return (
    <div className="flex justify-between items-center px-[4%] py-2">
      <NavLink to={"/"} className="w-[max(10%,80px)]">
        <img src={assets.logo} alt="" className="w-full" />
      </NavLink>
      <button
        onClick={() => {
          onSubmitHandler();
        }}
        className="bg-gray-600 text-white text-sm font-semibold px-5 py-2 sm:px-7 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
