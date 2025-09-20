import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import logo from "../Assets/logo.png";
const CheckoutComp = () => {
  const { getTotalCartAmount, all_product, cartItems } =
    useContext(ShopContext);
  return (
    <>
      <div className="text-center">
        <img src={logo} width={"100px"} alt="OneStyle Logo" />
      </div>
      <div className="container py-4">
        <div className="row">
          {/* Left side form */}
          <div className="col-md-7">
            {/* Contact */}
            <div className="mb-4">
              <h5>Contact</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or mobile phone number"
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="offers"
                />
                <label htmlFor="offers" className="form-check-label">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-4">
              <h5>Delivery</h5>
              <div className="mb-3">
                <select className="form-select">
                  <option>Pakistan</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal code (optional)"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="saveInfo"
                />
                <label htmlFor="saveInfo" className="form-check-label">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Shipping method */}
            <div className="mb-4">
              <h5>Shipping method</h5>
              <div className="border rounded p-2 d-flex justify-content-between">
                <span>Free Shipping</span>
                <span className="fw-bold">FREE</span>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-4">
              <h5>Payment</h5>
              <p className="text-muted">
                All transactions are secure and encrypted.
              </p>
              <div className="border rounded p-2">Cash on Delivery (COD)</div>
            </div>

            {/* Billing address */}
            <div className="mb-4">
              <h5>Billing address</h5>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="sameAddress"
                  name="billing"
                  defaultChecked
                />
                <label htmlFor="sameAddress" className="form-check-label">
                  Same as shipping address
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="differentAddress"
                  name="billing"
                />
                <label htmlFor="differentAddress" className="form-check-label">
                  Use a different billing address
                </label>
              </div>
            </div>

            <button className="btn naab-green-bg text-light w-75">
              Complete order
            </button>
          </div>

          {/* Right side order summary */}
          <div className="col-md-5">
            <div className="border rounded p-3">
              {/* Product */}
              {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div
                      key={e.id}
                      className="d-flex justify-content-between mb-3"
                    >
                      <div className="d-flex">
                        <img
                          src={e.image[0]}
                          alt="Product"
                          className="carticon-product-icon me-2"
                        />
                        <div>
                          <p className="mb-1 fw-bold">{e.name}</p>
                          <small>{e.desc}</small>
                        </div>
                      </div>
                      <p className="fw-bold">
                        Rs {e.new_price * cartItems[e.id]}
                      </p>
                    </div>
                  );
                }
              })}
              {/* Discount code */}
              {/* <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Discount code"
              />
              <button className="btn btn-outline-secondary">Apply</button>
            </div> */}

              {/* Summary */}
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>RS {getTotalCartAmount()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>RS {getTotalCartAmount()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComp;
