import React, {Component, useState} from "react";
import Slider from "react-slick";
import LeftArrow from "../../../public/right-arrow.png";
function CustomPaging() {
    const imgs=[
        {id:0,value:"https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg"},
        {id:1,value:"https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"},
        {id:2,value:"https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg"},
    ]
    const [wordData,setWordData]=useState(imgs[0])
    const [val,setVal] = useState(0)
    const handleClick=(index)=>{
        console.log(index)
        setVal(index)
        const wordSlider=imgs[index];
        setWordData(wordSlider)
    }
    const handleNext = ()=>{
        let index = val < imgs.length -1 ? val +1 : val;
        setVal(index)
        const wordSlider=imgs[index];
        setWordData(wordSlider)
    }
    const handlePrevious = ()=>{
        let index = val <= imgs.length -1 && val > 0? val - 1 : val;
        setVal(index)
        const wordSlider=imgs[index];
        setWordData(wordSlider)
    }
    return (
        <div className="main">
            <button className='btns' onClick={handlePrevious}>
                <img src={LeftArrow}/>
            </button>
            <img src={wordData.value} height="300" width="500" />
            <button className='btns' onClick={handleNext}>N</button>
            <div className='flex_row'>
                {imgs.map((data,i)=>
                    <div className="thumbnail" key={i} >
                        <img className={wordData.id==i?"clicked":""} src={data.value} onClick={()=>handleClick(i)} height="70" width="100" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomPaging;
