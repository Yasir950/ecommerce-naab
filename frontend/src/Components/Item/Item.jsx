import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          src={props.image}
          alt=""
          style={{ height: props.height ? props.height : "" }}
        />
      </Link>
      <div style={{ padding: "5px 15px" }}>
        <p class="fw-bold fs-5">{props.name}</p>
        <p>{props.desc}</p>
        <div className="item-prices">
          <div className="item-price-new">PKR {props.new_price}</div>
          <div className="item-price-old">
            {props.old_price && `PKR ${props.old_price}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
