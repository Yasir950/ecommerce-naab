import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import free_shipping from "../Assets/free_shipping.png";
import easy_return from "../Assets/easy_return.png";
import secure_payments from "../Assets/secure_payment.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image_2.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/womens");
  };

  return (
    <div className="hero">
      <div
        id="carouselExampleCaptions"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src={
                "https://powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=375%20375w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=740%20740w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=750%20750w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=1100%201100w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=1370%201370w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=1500%201500w,//powerfoods.shop/cdn/shop/files/banner_best_selling_copy_dad63fff-6046-481c-a025-49377766f106.webp?v=1738560951&width=1770%201770w,"
              }
              style={{ borderRadius: "10px" }}
              class="d-block w-100 "
              alt="..."
            />
            {/* <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div> */}
          </div>
          <div class="carousel-item">
            <img
              src="https://powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=375 375w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=740 740w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=750 750w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1100 1100w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1370 1370w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1500 1500w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1770 1770w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1780 1780w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=1880 1880w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=2000 2000w,//powerfoods.shop/cdn/shop/files/Talbeena_Banner-02.webp?v=1736600848&width=2800 2800w"
              class="d-block w-100"
              style={{ borderRadius: "10px" }}
              alt="..."
            />
            {/* <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div> */}
          </div>
          <div class="carousel-item">
            <img
              src="https://powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=375 375w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=740 740w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=750 750w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=1100 1100w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=1370 1370w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=1500 1500w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=1770 1770w,//powerfoods.shop/cdn/shop/files/Banner_1.webp?v=1735901030&width=1780 1780w,"
              class="d-block w-100"
              style={{ borderRadius: "10px" }}
              alt="..."
            />
            {/* <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div> */}
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
