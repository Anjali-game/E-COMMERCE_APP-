import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, id, loading }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  return (
    <div className="w-full min-w-[160px] max-w-[200px] bg-white hover:drop-shadow-lg py-5 px-4  cursor-pointer">
      {name ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-full min-h-[80px] -py-2  flex flex-col justify-center items-center   ">
              <img src={image} alt="" className="h-full"></img>

              <h3 className="font-semibold text-slate-800 text-center   capitalize   mt-2  text-lg whitespace-nowrap">
                {name}
              </h3>
              <p className=" text-slate-500 font-medium ">{category}</p>
              <p className=" font-bold ">
                {" "}
                <span className="text-red-500">₹</span>
                <span>{price}</span>
              </p>
            </div>
          </Link>

          <button
            className="bg-yellow-500 py-1  hover:bg-yellow-600 w-full  "
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[150px]">
          <p> {loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
