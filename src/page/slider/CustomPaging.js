import React, { Component, useState } from "react";
import Slider from "react-slick";
import LeftArrow from "../../asset/left-arrow.png";
import RightArrow from "../../asset/right-arrow.png";
import "../../css/slider.css"


function CustomPaging() {
  const imgs = [
    {
      id: 0,
      value:
        "https://product.hstatic.net/1000075078/product/1703471714_bg-vang-tra-xanh-espresso-marble_8b66b306026b44aaa6fd53f48bdf50c2.jpg",
    },
    {
      id: 1,
      value: "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
    },
    {
      id: 2,
      value:
        "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
    },
  ];
  const [wordData, setWordData] = useState(imgs[0]);
  const [val, setVal] = useState(0);
  const handleClick = (index) => {
    console.log(index);
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  const handleNext = () => {
    let index = val < imgs.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  const handlePrevious = () => {
    let index = val <= imgs.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  return (
    <div className="main">
      <div className="image-container">
        <img src={wordData.value} height="100%" width="100%" className="image" />
        <button className="btns left" onClick={handlePrevious}>
          <img src={LeftArrow} />
        </button>
        <button className="btns right" onClick={handleNext}>
          <img src={RightArrow} />
        </button>
      </div>

      <div className="flex_row">
        {imgs.map((data, i) => (
          <div className="thumbnail" key={i}>
            <img
              className={wordData.id == i ? "clicked" : ""}
              src={data.value}
              onClick={() => handleClick(i)}
              height="70"
              width="100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomPaging;
