import React, { Component, useState } from "react";
import Slider from "react-slick";
import LeftArrow from "../../asset/left-arrow.png";
import RightArrow from "../../asset/right-arrow.png";
import "../../css/slider.css"


function CustomPaging({ urlImages }) {
  const imgs = urlImages.map((url, index) => ({
    id: index,
    value: url,
  }));

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
        <img src={wordData.value}  className="image" />
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
