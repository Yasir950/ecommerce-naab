import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import start_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [image, setImage] = useState(product.image[0]);
  const selectedImage = (image) => {
    setImage(image);
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-main-img">
        <img
          src={image}
          alt="Product"
          style={{ height: "450px", width: "300px" }}
        />
      </div>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.image.map((item) => (
            <img
              src={item}
              alt="Product"
              onClick={() => selectedImage(item)}
              className={`p-1 ${item === image ? "naab-green-outline" : ""}`}
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
          <div className="productdisplay-right-price-old">
            PKR {product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            PKR {product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          <p>{product.description}</p>
        </div>

        {/* <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div> */}
        <Link to="/cart">
          <button
            className="btn naab-green-outline w-100"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDisplay;
