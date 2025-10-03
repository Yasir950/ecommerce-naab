import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import start_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");

  // Set default image when product changes
  useEffect(() => {
    if (product?.images?.length > 0) {
      setImage(product.images[0]);
    }
  }, [product]);

  const selectedImage = (img) => {
    setImage(img);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-main-img">
        <img
          src={image}
          alt="Product"
          style={{
            maxHeight: "500px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.images?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="Product Thumbnail"
              onClick={() => selectedImage(item)}
              className={`thumb ${item === image ? "active-thumb" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          <img src={start_icon} alt="Star" />
          <img src={start_icon} alt="Star" />
          <img src={start_icon} alt="Star" />
          <img src={start_icon} alt="Star" />
          <img src={star_dull_icon} alt="Star" />
          <p>(15 Reviews)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">
            PKR {product.price}
          </div>
        </div>

        <div
          className="productdisplay-right-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>

        <Link to="/cart">
          <button
            className="btn naab-green-outline w-100"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDisplay;
