import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import { getData } from "../apiservices";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]); // products state
  const [cartItems, setCartItems] = useState({}); // cart state
  const clearCart = () => {
    setCartItems({});
  };
  // ✅ Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getData("products");
        setAllProducts(res || []);
        // initialize cart after products are loaded
        setCartItems(getDefaultCart(res || []));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ build default cart dynamically
  const getDefaultCart = (products) => {
    let cart = {};
    products.forEach((product) => {
      cart[product._id] = 0; // use MongoDB _id as key
    });
    return cart;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (itemId, count) => {
    setCartItems((prev) => ({ ...prev, [itemId]: count }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allProducts,
    cartItems,
    addToCart,
    clearCart,
    removeFromCart,
    updateCartItemCount, // Added here
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
