import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const userData = useSelector((state) => state.user);
  

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };
  
  const cartItemNumber = useSelector((state) => state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 md:px-4 z-50 bg-rose-100">
      {/* {desktop} */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo} className="h-full" alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="  flex gap-4 md:gap-6 text-base md:text-lg ">
            <Link to={""}>Home</Link>
            <Link to={"menu/659e7a3fe4cd266058edd1d9"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
           <Link to={"cart"} ><BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              {cartItemNumber?.length}
            </div>
            </Link>
          </div>
          <div className=" text-slate-600"></div>
          <div
            className="  text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md "
            onClick={handleShowMenu}
          >
            {userData.image ? (
              <img src={userData.image} className="h-full w-full" alt="" />
            ) : (
              <HiOutlineUserCircle />
            )}
          </div>
          {showMenu && (
            <div className=" absolute right-2 bg-white  px-2  top-11 py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center ">
              {process.env.REACT_APP_ADMIN_EMAIL === userData.email && (
                <Link
                  to={"Newproduct"}
                  className="whitespace-nowrap cursor-pointer"
                >
                  New product
                </Link>
              )}

              {userData.image ? (
                <p
                  className="cursor-pointer text-white  px-2 bg-red-500"
                  onClick={handleLogout}
                >
                  Logout ({userData.firstName})
                </p>
              ) : (
                <Link
                  to={"login"}
                  className="whitespace-nowrap cursor-pointer px-2"
                >
                  Login
                </Link>
              )}
              <nav className="text-base md:text-lg  flex flex-col md:hidden ">
            <Link to={""}className="px-2 py-1 ">Home</Link>
            <Link to={"menu/659e7a3fe4cd266058edd1d9"}className="px-2 py-1 ">Menu</Link>
            <Link to={"about"}className="px-2 py-1 ">About</Link>
            <Link to={"contact"}className="px-2 py-1 ">Contact</Link>
          </nav>
             
            </div>
          )}
        </div>
      </div>

      {/* {mobile} */}
    </header>
  );
};

export default Header;
