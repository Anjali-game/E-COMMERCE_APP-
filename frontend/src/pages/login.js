import React, { useState } from "react";
import loginimage from "../assets/loginimage.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes.datauser));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      console.log(userData);
    } else {
      alert("Please Enter Required Fields!!");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/* <h1 className='text-center font-bold text-2xl'> Sign Up </h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto">
          <img src={loginimage} className="w-full" alt="" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email </label>
          <input
            type={"text"}
            id="email"
            name="email"
            className="w-full  mt-1  mb-2rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password </label>
          <div className="flex mt-1 mb-2 bg-slate-200 rounded px-2 py-1 outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full   bg-slate-200 border-none outline-none"
              vlaue={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl  cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[120px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Login
          </button>
          <p className="text-left text-sm mt-3">
            Don't have an account ?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
