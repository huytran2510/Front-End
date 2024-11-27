import React, { useState } from "react";
import HeaderNav from "../header/HeaderNav";
import SliderComponent from "../slider/SliderComponent";
import "../../css/coffee.css";
const CoffeeHatRang = () => {
  const images = [
    "https://minio.thecoffeehouse.com/image/admin/1727691285_web-cu-1.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1702453536_banner-1.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1702453543_banner-2-den.jpg",
  ];
  const [activeIndex, setActiveIndex] = useState(null); 

  const toggleClass = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <HeaderNav />
      <div>
        <SliderComponent arrImages={images} />
        <ul
          data-v-6d97cdd0=""
          id="menu-from-house-content"
          role="tablist"
          class="tch-category-card-list tch-category-card-list--spacing d-flex justify-content-md-center flex-xl-wrap flex-lg-wrap border-0"
        >
          <li data-v-6d97cdd0="" class="ml-2 ml-lg-3 mb-2 nav-item">
            <a
              data-v-6d97cdd0=""
              // role="tab"
              // data-toggle="tab"
              // href="Signature CPG Coffee"
              // aria-controls="Signature CPG Coffee"
              aria-selected="true"
              onClick={() => toggleClass(1)}
              class={`nav-link nav-link-category m-0 border-0 ${activeIndex === 1 ? "active" : ""}`}
            >
              <div
                data-v-6d97cdd0=""
                class="tch-category-card d-flex flex-column align-items-center"
              >
                <div
                  data-v-6d97cdd0=""
                  class="d-flex justify-content-center align-items-center tch-category-card__image tch-category-card--circle"
                >
                  <img
                    data-v-6d97cdd0=""
                    src="https://minio.thecoffeehouse.com/image/admin/1675690611_8-signature-cpg-coffee.png"
                    alt=""
                  />
                </div>{" "}
                <div data-v-6d97cdd0="" class="tch-category-card__content">
                  <h5
                    data-v-6d97cdd0=""
                    class="tch-category-card__title text-center mb-0"
                  >
                    Signature CPG Coffee
                  </h5>
                </div>
              </div>
            </a>
          </li>
          <li data-v-6d97cdd0="" class="ml-2 ml-lg-3 mb-2 nav-item">
            <a
              data-v-6d97cdd0=""
              // role="tab"
              // data-toggle="tab"
              // href="Cà Phê - Trà Đóng Gói"
              // aria-controls="Cà Phê - Trà Đóng Gói"
              aria-selected="true"
              onClick={() => toggleClass(2)}
              class={`nav-link nav-link-category m-0 border-0 ${activeIndex === 2 ? "active" : ""}`}
            >
              <div
                data-v-6d97cdd0=""
                class="tch-category-card d-flex flex-column align-items-center"
              >
                <div
                  data-v-6d97cdd0=""
                  class="d-flex justify-content-center align-items-center tch-category-card__image tch-category-card--circle"
                >
                  <img
                    data-v-6d97cdd0=""
                    src="https://minio.thecoffeehouse.com/image/admin/1732167845_iconcate-caphetradonggoi.png"
                    alt=""
                  />
                </div>{" "}
                <div data-v-6d97cdd0="" class="tch-category-card__content">
                  <h5
                    data-v-6d97cdd0=""
                    class="tch-category-card__title text-center mb-0"
                  >
                    Cà Phê - Trà Đóng Gói
                  </h5>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CoffeeHatRang;
