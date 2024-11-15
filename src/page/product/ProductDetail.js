import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CustomPaging from "../slider/CustomPaging";

const ProductDetail = () => {
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={i === 0 ? "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg" :
                        i === 1 ? "https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg" :
                            "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg"}
                         alt={`thumbnail-${i + 1}`}/>
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Header/>
            <div className={"product_info"}>
                <div className={"container product_wrap"}>
                    <div className={"col-lg-6 col-md-6 col-sm-6 col-xl-12"}>
                        <div className="slider-container">

                        </div>
                    </div>
                    <div className={"col-lg-6 col-md-6 col-sm-6 col-xl-12"}>

                    </div>
                </div>
            </div>

            <CustomPaging/>
            <Footer/>
        </>
    )
}

export default ProductDetail