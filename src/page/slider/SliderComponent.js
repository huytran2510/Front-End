import React, {Component, lazy} from "react";
import Slider from "react-slick";
import "../../css/slider.css"
const SliderComponent = ({arrImages}) => {
    const settings = {
        customPaging: function (i) {
            return (
                // <a>
                //     <img src={arrImages[i]} alt={`Thumbnail ${i + 1}`} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                // </a>
                <div className="custom-dot"></div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {arrImages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderComponent;
