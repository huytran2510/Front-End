import React, { useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SliderComponent from "../slider/SliderComponent";
import "../../css/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import Aos from "aos";

const Homepage = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const images = [
    "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_ebafdd167f4543d38f2099b61b267642.jpg",
    "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_80626cda30824027b21dd7932e02f306.jpg",
    "https://file.hstatic.net/1000075078/file/desktop_fd962a6f8c6047258311c8be3ca7681c.jpg",
    "https://file.hstatic.net/1000075078/file/desktop_1dfffc4d98274531a784cc22329b8fab.jpg",
    "https://file.hstatic.net/1000075078/file/web_moi_-_desktop_ebafdd167f4543d38f2099b61b267642.jpg",
  ];
  const pageStyle = {
    // display: 'flex',
    // flexDirection: 'column',
    // minHeight: '100vh', // Chiều cao tối thiểu của trang là 100% viewport
  };
  const contentStyle = {
    // flex: 1, // Đẩy footer xuống dưới khi nội dung phát triển
  };

  return (
    <>
      <Header />
      <div style={pageStyle}>
        <SliderComponent style={contentStyle} arrImages={images} />
        <div className={"container d-flex flex-row flex-wrap menu-home"}>
          <div class="menu_item menu_banner">
            <a>
              <img
                src={"https://file.hstatic.net/1000075078/file/banner_app.jpg"}
              />
            </a>
          </div>
          <div class="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>
          <div class="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>

          <div className="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>
          <div className="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>

          <div className="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>
          <div className="menu_item">
            <div className={"menu_item_image"}>
              <a>
                <img
                  src={
                    "https://product.hstatic.net/1000075078/product/1669736893_hi-tea-vai_7057577f3717414db7e0255646263516_large.png"
                  }
                />
              </a>
            </div>
            <div className="menu_item_info">
              <h3>
                <a
                  href="/products/bo-sua-pho-mai-tuoi"
                  title="Bơ Sữa Phô Mai Tươi"
                >
                  Bơ Sữa Phô Mai Tươi
                </a>
              </h3>
              <div className="price_product_item">55.000 đ</div>
            </div>
          </div>
        </div>

        <div className="section_1 container flex-wrap d-flex align-items-end justify-content-end flex-row">
          <div className={"img_block"}>
            <img src={""} />
          </div>

          <div class="menu_content" data-aos="fade-right">
            <div>
              <img
                src={
                  "https://file.hstatic.net/1000075078/file/tagline__1__1_378410beecb347f38cf8425ef7459690.png"
                }
              />
            </div>
            <div data-aos="fade-down">
              <p>
                Được trồng trọt và chăm chút kỹ lưỡng, nuôi dưỡng từ thổ nhưỡng
                phì nhiêu, nguồn nước mát lành, bao bọc bởi mây và sương cùng
                nền nhiệt độ mát mẻ quanh năm, những búp trà ở Tây Bắc mập mạp
                và xanh mướt, hội tụ đầy đủ dưỡng chất, sinh khí, và tinh hoa
                đất trời.  Chính khí hậu đặc trưng cùng phương pháp canh tác của
                đồng bào dân tộc nơi đây đã tạo ra Trà Xanh vị mộc dễ uống, dễ
                yêu, không thể trộn lẫn với bất kỳ vùng miền nào khác.
              </p>
            </div>
            <button className={"btnTry"}>Thử ngay</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
