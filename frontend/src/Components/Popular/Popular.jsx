import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { getData } from "../../apiservices";

const Popular = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let res = await getData("products");
    setFilteredProducts(res);
  };
  return (
    <div className="popular">
      <h1
        className=" line"
        style={{
          fontFamily: "DM Sans",
        }}
      >
        Our Most Famous Products
      </h1>
      <div className="popular-item">
        {filteredProducts.slice(0, 4).map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              desc={item.description}
              image={item?.images[0]}
              height={"200px"}
              new_price={item.price}
              old_price={item.discount}
            ></Item>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
