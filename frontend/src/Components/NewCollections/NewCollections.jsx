import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";
import { getData } from "../../apiservices";

const NewCollections = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let res = await getData("products");
    setFilteredProducts(res);
  };
  return (
    <div className="new-collections">
      <h1
        className=" line"
        style={{
          fontFamily: "DM Sans",
          marginTop: "20px",
        }}
      >
        New Collections
      </h1>
      <div className="collections">
        {filteredProducts.slice(0, 10).map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              desc={item.description}
              name={item.name}
              image={item.images[0]}
              new_price={item.price}
              height={"300px"}
            ></Item>
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
