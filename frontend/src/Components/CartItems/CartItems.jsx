import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router";
import { getData } from "../../apiservices";

const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]); // products state

  // ✅ Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getData("products");
        setAllProducts(res || []);
        // initialize cart after products are loaded
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const handleAddQuantity = (id) => {
    updateCartItemCount(id, cartItems[id] + 1);
  };

  const handleSubtractQuantity = (id) => {
    if (cartItems[id] > 1) {
      updateCartItemCount(id, cartItems[id] - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>PRODUCT</p>
        <p>TITLE</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p>TOTAL</p>
        <p>REMOVE</p>
      </div>
      <hr />
      {allProducts?.length === 0 ? (
        <p>No products available</p>
      ) : (
        allProducts?.map((e) => {
          if (cartItems[e._id] > 0) {
            return (
              <div key={e._id}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    src={e?.images[0]}
                    alt=""
                    className="carticon-product-icon"
                  />
                  <p>{e.name}</p>
                  <p>RS {e.price}</p>
                  <div className="cartitems-quantity-wrapper">
                    <button
                      className="minus"
                      onClick={() => handleSubtractQuantity(e._id)}
                    >
                      -
                    </button>
                    <span className="cartitems-quantity">
                      {cartItems[e._id]}
                    </span>
                    <button
                      className="plus"
                      onClick={() => handleAddQuantity(e._id)}
                    >
                      +
                    </button>
                  </div>
                  <p>Rs {e.price * cartItems[e._id]}</p>
                  <div
                    onClick={() => removeFromCart(e._id)}
                    className="text-danger fw-bold carticon-remove-icon"
                  >
                    X
                  </div>
                  {/* <img
                    src={remove_icon}
                    onClick={() => removeFromCart(e.id)}
                    alt="Remove"
                    className="carticon-remove-icon"
                  /> */}
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sub Total: </p>
              <p>RS {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Free</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total: </h3>
              <h3>RS {getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to="/checkout">
            <button className="btn naab-green-outline w-25">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
