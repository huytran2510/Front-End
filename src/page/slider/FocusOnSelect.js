import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  if (imgs.length === 1) {
    // Nếu chỉ có 1 ảnh, hiển thị đơn giản
    return (
        <div className="product-category">
          <div className="slider-item">
            <a href="#">
              <img src={imgs[0].value} alt={imgs[0].name} className="product-image" style={{width:"174px",height:"174px"}} />
            </a>
            <h3 className="product-name">{imgs[0].name}</h3>
            <p className="product-price">{imgs[0].price.toLocaleString()}₫</p>
          </div>
        </div>
    );
  }

  const settings = {
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    speed: 500,
    arrows: true,
    autoplay: true,
  };


  return (
    <div className=" product-category">
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
