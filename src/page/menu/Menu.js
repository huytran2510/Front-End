import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../css/menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Bỏ số thập phân
  }).format(value);
}
const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const menuItems = [
    {
      name: "Cà Phê",
      subMenu: ["Bánh mặn", "Bánh ngọt", "Bánh Pastry"],
    },
    {
      name: "Trà",
      subMenu: ["qq", "Bánh ngọt", "Bánh Pastry"],
    },
  ];
  const toggleMenu = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null); // Nếu menu đang mở, đóng lại
    } else {
      setActiveMenu(index); // Mở menu tương ứng
    }
  };
  const toggleSubMenu = (subIndex) => {
    if (activeSubMenu === subIndex) {
      setActiveSubMenu(null); // Nếu đã chọn menu con này, bỏ chọn
    } else {
      setActiveSubMenu(subIndex); // Mở menu con mới
    }
  };
  const products = [
    { id: 1, name: "Sản phẩm 1", price: 20000 },
    { id: 2, name: "Sản phẩm 2", price: 20000 },
    { id: 3, name: "Sản phẩm 3", price: 20000 },
    { id: 4, name: "Sản phẩm 4", price: 20000 },
    { id: 5, name: "Sản phẩm 5", price: 20000 },
    { id: 6, name: "Sản phẩm 6", price: 20000 },
  ];

  return (
    <>
      <Header />
      <div className={"collection"}>
        <div className={"collection_menu_wrap"}>
          <div className={"container"}>
            <div className={"row"}>
              <div
                className={"col-lg-3 col-md-3 col-sm-12 col-xs-12 stikySidebar"}
              >
                <aside className={"sidebar_menu"}>
                  <ul>
                    {menuItems.map((menu, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className={activeMenu === index ? "child_active" : ""}
                          onClick={() => toggleMenu(index)}
                        >
                          {menu.name}
                        </a>

                        {/* Menu con */}
                        <ul
                          className={`sidebar_menu_lv2 ${
                            activeMenu === index ? "show" : ""
                          }`}
                        >
                          {menu.subMenu.map((item, subIndex) => (
                            <li key={subIndex}>
                              <a
                                href="#"
                                className={
                                  activeSubMenu === subIndex
                                    ? "child_active"
                                    : ""
                                }
                                onClick={() => toggleSubMenu(subIndex)}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
              <div
                className={
                  "col-lg-9 col-md-9 col-sm-12 col-xs-12 border_right_before"
                }
              >
                <div className="collection_content">
                  <div className="collection_wrap wrap">
                    <div className="product_grid">
                      {products.map((product) => (
                        <div className="product_card" key={product.id}>
                          <a>
                            <img
                              src="https://product.hstatic.net/1000075078/product/1719929441_bo-sua-pmt_77e27a929b5340e5bc7b83bb1963f0eb_large.jpg"
                              alt={product.name}
                            />
                            <h4>{product.name}</h4>
                            <p>{formatCurrency(product.price)}</p>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menu;
