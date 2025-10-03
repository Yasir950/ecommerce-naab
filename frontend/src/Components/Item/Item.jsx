import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/detail/${props.id}`}>
        <img
          src={props.image}
          alt=""
          style={{ height: props.height ? props.height : "" }}
        />
      </Link>
      <div style={{ padding: "5px 15px 25px 15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <div class="item-price-new">{props.name}</div>
          <div className="item-price-new naab-green-text">
            PKR {props.new_price}
          </div>
        </div>
        <p className="desc-preview">{props.desc}</p>
      </div>
    </div>
  );
};

export default Item;
