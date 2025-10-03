import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router";
import Breadcrump from "../Components/Breadcrump/Breadcrump";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { getData } from "../apiservices";
import Loader from "../Components/loader/loader";

const Product = () => {
  const { productId } = useParams();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setCategory] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    setLoader(true);
    let res = await getData("products");
    let cat = await getData("categories");
    const found = res.find((e) => e._id == productId);
    const foundCat = cat.find((e) => e._id == found.category);
    setCategory(foundCat.name);
    setFilteredProduct(found);
    if ((res.length !== 0) & (cat.length !== 0)) {
      setLoader(false);
    }
  };
  if (!filteredProduct) {
    return <div>Product not found or still loading...</div>;
  }

  return (
    <div>
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Breadcrump product={filteredProduct} cat={category} />
          <ProductDisplay product={filteredProduct} />
        </>
      )}
    </div>
  );
};

export default Product;
