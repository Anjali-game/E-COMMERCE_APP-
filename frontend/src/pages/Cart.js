import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";

const Cart = () => {
  const productCartitem = useSelector((state) => state.product.cartItem);
  
  

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartitem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartitem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productCartitem),
        }
      );
      if (res.status === 500) return;

      const data = await res.json();
      
      const sessionId = data.sessionId;

      if (!sessionId) {
        console.error("Invalid data structure. Missing sessionId property.");
        return;
      }

      

      toast("Redirect to payment Gateway...!");
      try {
        stripePromise.redirectToCheckout({ sessionId });
      } catch (error) {
        console.error("Error redirecting to checkout:", error);
      }
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          {" "}
          Your Cart items
        </h2>

        {productCartitem[0] ? (
          <div className="my-4 flex gap-3">
            {/*display cart items*/}
            <div className="w-full  max-w-3xl">
              {productCartitem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    name={el.name}
                    id={el._id}
                    image={el.image}
                    price={el.price}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>
            {/*total cart items*/}
            <div className="w-full max-w-md  ml-auto ">
              <h2 className="bg-blue-300 text-white p-2 text-lg">Summary</h2>
              <div className=" flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="m-auto w-32 font-bold "> {totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="m-auto w-32 font-bold ">
                  <span className="text-red-500">₹</span> {totalPrice}{" "}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg py-2 text-white"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className=" flex w-full   justify-center text-size-4xl items-center flex-col">
              <img src={emptyCartImage} alt=" w-full    bg-slate-300" />
              <p className="text-slate-500 font-bold text-3xl">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
