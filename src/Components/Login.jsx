import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../Utils/axios";
function Login({ setToken }) {
  useEffect(() => {}, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post(`/api/user/admin`, {
        email,
        password,
      });
      if (res.data.success === true) {
        toast.success("Successful Login");
        setToken(res.data.success);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
      console.log("Error", error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              value={email}
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="placeholder:text-gray-400 rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              value={password}
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="placeholder:text-gray-400 rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white mt-2 py-2 px-2 rounded-md w-full"
            onClick={(e) => {
              onSubmitHandler(e);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
