import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import logo from "../Assets/logo.png";
import { getData, saveUserData } from "../../apiservices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CheckoutComp = () => {
  const { getTotalCartAmount, cartItems, clearCart } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]); // products state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first: "",
    last: "",
    address: "",
    city: "",
    password: "",
    contact: "",
    country: "Pakistan",
  });

  // ✅ Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getData("products");
        setAllProducts(res || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Check if user already exists
      let userId;
      const existingUser = await getData(`users?email=${formData.email}`); // backend should handle ?email= query
      if (existingUser.length !== 0 && existingUser[0]._id) {
        userId = existingUser[0]._id;
      } else {
        // 2. Create new user
        const userRes = await saveUserData("users", {
          first: formData.first,
          last: formData.last,
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          password: formData.password,
        });
        userId = userRes._id;
      }

      // 3. Build order payload
      const items = Object.keys(cartItems)
        .filter((id) => cartItems[id] > 0)
        .map((id) => {
          const product = allProducts.find((p) => p._id === id);
          return {
            productId: id,
            name: product?.name,
            quantity: cartItems[id],
            price: product?.price,
          };
        });

      // 4. Save order
      const orderRes = await saveUserData("orders", {
        user: userId,
        products: items,
        price: getTotalCartAmount(),
      });
      if (orderRes.data.user) {
        navigate("/login");
        toast.success("Order placed successfully!");
        clearCart();
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="text-center">
        <img src={logo} width={"100px"} alt="OneStyle Logo" />
      </div>
      <div className="container py-4">
        <form className="row" onSubmit={handleSubmit}>
          {/* Left side form */}
          <div className="col-md-7">
            {/* Contact */}
            <div className="mb-4">
              <h5>Contact</h5>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email or mobile contact number"
                  required
                />
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-4">
              <h5>Delivery</h5>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option>Pakistan</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="first"
                    value={formData.first}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="last"
                    value={formData.last}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Address"
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="password (you can login you account with this password)"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Phone"
                />
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

            <button type="submit" className="btn naab-green-bg text-light w-75">
              Complete order
            </button>
          </div>

          {/* Right side order summary */}
          <div className="col-md-5">
            <div className="border rounded p-3">
              {allProducts.map((e) => {
                if (cartItems[e._id] > 0) {
                  return (
                    <div
                      key={e._id}
                      className="d-flex justify-content-between mb-3"
                    >
                      <div className="d-flex">
                        <img
                          alt="Product"
                          src={e.images[0]}
                          className="carticon-product-icon me-2"
                        />
                        <div>
                          <p className="mb-1 fw-bold">{e.name}</p>
                          <small>{e.description}</small>
                        </div>
                      </div>
                      <p className="fw-bold">Rs {e.price * cartItems[e._id]}</p>
                    </div>
                  );
                }
                return null;
              })}

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
        </form>
      </div>
    </>
  );
};

export default CheckoutComp;
