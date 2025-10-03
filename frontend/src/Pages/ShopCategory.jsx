import React, { useState, useEffect, useMemo } from "react";
import "./Css/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from "../Components/Item/Item";
import SearchFilter from "../Components/SearchFilter/SearchFilter";
import { getData } from "../apiservices";
import { useParams } from "react-router";
import Loader from "../Components/loader/loader";

const ShopCategory = (props) => {
  const { catId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredProductsData, setFilteredProducts] = useState([]);
  const [categoriesData, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [catId]);
  const getProducts = async () => {
    setLoading(true);
    let res = await getData("products", catId);
    let categories = await getData("categories");
    setFilteredProducts(res);
    setCategories(categories);
    if ((res.length !== 0) & (categories.length !== 0)) {
      setLoading(false);
    }
  };

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return filteredProductsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? (product.category?._id || product.category)?.toString() ===
          selectedCategory.toString()
        : true;
      const matchesPrice =
        priceRange === "low"
          ? product.price < 3000
          : priceRange === "medium"
          ? product.price >= 3000 && product.price <= 4000
          : priceRange === "high"
          ? product.price > 4000
          : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange, filteredProductsData]);

  return (
    <div className="shop-category">
      {/* <img className="shopcategory-banner" src={props.banner} alt="" /> */}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> Out of{" "}
          {filteredProductsData.length} Products
        </p>
        {/* <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div> */}
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categoriesData}
      />

      <div className="shopcategory-products">
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          filteredProducts.map((item, i) => {
            return (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                image={item?.images[0]}
                new_price={item.price}
                old_price={item.old_price}
                desc={item.description}
                height={"300px"}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
