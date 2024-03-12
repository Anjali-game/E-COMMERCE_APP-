import React from "react";
import FilterProduct from "./FilterProduct";
import { useState, useEffect } from "react";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const Allproduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  const categoryList = [...new Set(productData.map((el) => el.category))];

  // filter display items
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <>
      <div className="my-5">
        <h2 className="font-bold  text-2xl text-slate-800  mb-4"> {heading}</h2>
      </div>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center min-h-[150px]">
            <p> Loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
    </>
  );
};

export default Allproduct;
