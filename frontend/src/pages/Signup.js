/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import loginimage from "../assets/loginimage.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64.js";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
 
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(data);
    const { firstName, lastName, email, password, confirmpassword } = data;
    if (firstName && lastName && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/Signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();

        

        //alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes) {
          navigate("/login");
        }
      } else {
        alert("passwords did not match");
      }
    } else {
      alert("Please Enter Required Fields!!");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/* <h1 className='text-center font-bold text-2xl'> Sign Up </h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex items-center m-auto relative">
          <img
            src={data.image ? data.image : loginimage}
            className="w-full h-full"
            alt=""
          />

          <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
            <label htmlFor="profileImage"> Upload </label>
            <p className="text-sm p-1 text-white">Upload</p>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </div>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="w-full  mt-1  mb-2rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300 "
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="w-full  mt-1  mb-2 rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />

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
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl  cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">ConfirmPassword </label>
          <div className="flex mt-1 mb-2 bg-slate-200 rounded px-2 py-1 outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="w-full   bg-slate-200 border-none outline-none"
              value={data.confirmpassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl  cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full max-w-[120px] m-auto bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign Up
          </button>
          <p className="text-left text-sm mt-3">
            Already have account ?{" "}
            <Link to={"/login"} className="text-red-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
