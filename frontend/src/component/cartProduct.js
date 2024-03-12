import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";
const CartProduct = ({ id, name, qty, total, category, image, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex  gap-4 border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover" alt="" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize  text-2xl md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500 font-medium ">{category}</p>
        <p className=" font-bold ">
          {" "}
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <button
              className="bg-slate-300 py-1  hover:bg-slate-400 mt-2  min-w-[100px] p-1 "
              onClick={() => dispatch(increaseQty(id))}
            >
              {" "}
              <TbPlus />
            </button>
            <p className="font-semibold p-1 ">{qty}</p>
            <button
              className="bg-slate-300 py-1  hover:bg-slate-400 mt-2  min-w-[100px] p-1 "
              onClick={() => dispatch(decreaseQty(id))}
            >
              <TbMinus />
            </button>
          </div>
          <div className=" flex item-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
