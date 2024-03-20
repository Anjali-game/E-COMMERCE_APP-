import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Allproduct from "../component/Allproduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };
  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto    md:flex gap-10">
        <div className="max-w-[300px] overflow-hidden  max-h-[300px]  w-full">
          <img
            src={productDisplay.image}
            alt=""
            className="hover:scale-105 transition-all  h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-slate-600  capitalize  text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium md:text-3xl">
            {productDisplay.category}
          </p>
          <p className=" font-bold ">
            {" "}
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>

          <div className="flex gap-3">
            <button
              className="bg-yellow-500 py-1  hover:bg-yellow-600 mt-2  min-w-[100px]"
              onClick={handleBuy}
            >
              Buy{" "}
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-yellow-500 py-1  hover:bg-yellow-600 mt-2  min-w-[100px]"
            >
              Add to Cart
            </button>
          </div>
          <div className="">
            <p className="text-slate-600 font-medium">Description :</p>
            <p> {productDisplay.description}</p>
          </div>
        </div>
      </div>

      <Allproduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
