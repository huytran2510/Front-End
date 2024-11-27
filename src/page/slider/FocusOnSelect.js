import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function FocusOnSelect({ images }) {
  console.log("images", images);
  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }
  const imgs = images.map((item) => ({
    id: item.productId,
    value: item.urlImage,
    name: item.productName,
    price: item.unitPrice,
  }));

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    autoplay: 1000,
    nextArrow: <FaArrowRight style={{ color: "gray", fontSize: "24px" }} />,
    prevArrow: <FaArrowLeft style={{ color: "gray", fontSize: "24px" }} />,
  };

  return (
    <div className="slider-container product-category">
      <Slider {...settings}>
        {imgs.map((img) => (
          <div key={img.id} className="slider-item">
            <a href="#">
              <img src={img.value} alt={img.name} className="product-image" />
            </a>
            <h3 className="product-name">{img.name}</h3>
            <p className="product-price">{img.price.toLocaleString()}₫</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FocusOnSelect;
