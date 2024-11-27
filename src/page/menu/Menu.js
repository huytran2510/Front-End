import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../css/menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ajax from "../../ajax/fetchService";
import IconChat from "../chat/IconChat";
import ChatComponent from "../chat/ChatComponent";
import HeaderNav from "../header/HeaderNav";

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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedMainMenu, setSelectedMainMenu] = useState(null); // New state for main menu
  const [selectedTitle, setSelectedTitle] = useState(""); // New state for selected title
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  // Lấy giỏ hàng từ session storage khi component mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItem(savedCart);
  }, []);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const menuItems = [
    {
      name: "Tất cả",
      subMenu: [],
    },
    {
      name: "Cà Phê",
      subMenu: [
        { name: "Cà Phê Highlight", categoryId: 1 },
        { name: "Cà Phê Việt Nam", categoryId: 2 },
        { name: "Cà Phê Máy", categoryId: 3 },
        { name: "Cold Brew", categoryId: 4 },
      ],
    },
    {
      name: "Trái Cây Xay 0°C",
      subMenu: [{ name: "Trái Cây Xay 0°C ", categoryId: 5 }],
    },
    {
      name: "Trà Trái Cây - HiTea",
      subMenu: [{ name: "Trà Trái Cây - HiTea ", categoryId: 6 }],
    },
    {
      name: "Trà Sữa",
      categoryId: 4,
      subMenu: [{ name: "Trà Sữa", categoryId: 7 }],
    },
    {
      name: "Trà Xanh - Chocolate",
      subMenu: [
        { name: "Trà Xanh Tây Bắc", categoryId: 8 },
        { name: "Chocolate", categoryId: 9 },
      ],
    },
    {
      name: "Thức Uống Đá Xay",
      subMenu: [{ name: "Đá Xay Frosty", categoryId: 10 }],
    },
    {
      name: "Bánh & Snack",
      subMenu: [
        { name: "Bánh Mặn", categoryId: 11 },
        { name: "Bánh Ngọt", categoryId: 12 },
        { name: "Bánh Pastry", categoryId: 13 },
      ],
    },
    {
      name: "Thưởng Thức Tại Nhà",
      subMenu: [{ name: "Cà Phê Tại Nhà", categoryId: 14 }],
    },
  ];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const updateCart = (newCart) => {
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    setCartItem(newCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItem.filter((item) => item.id !== id); // Xóa sản phẩm dựa trên id
    updateCart(updatedCart); // Cập nhật lại giỏ hàng
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItem.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart); // Cập nhật lại giỏ hàng
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItem.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart); // Cập nhật lại giỏ hàng
  };

  const toggleMenu = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
      setSelectedMainMenu(null);
      setSelectedTitle("");
    } else {
      setActiveMenu(index);
      setSelectedMainMenu(
        menuItems[index].subMenu.map((item) => item.categoryId)
      ); // Store subcategories of selected menu
      setSelectedCategoryId(null);
      setSelectedTitle(menuItems[index].name);
    }
  };

  const toggleSubMenu = (subIndex, categoryId, subMenuName) => {
    setActiveSubMenu(subIndex);
    setSelectedCategoryId(categoryId);
    setSelectedMainMenu(null); // Clear main menu selection when a submenu is clicked
    setSelectedTitle(subMenuName); // Set title to submenu name
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ajax(`/products`, "", "GET", "")
      .then((products) => {
        console.log("Fetched products:", products);
        if (products) {
          setProducts(products);
        } else {
          console.error("No products found.");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value, 10); // Chuyển đổi giá trị nhập vào thành số
    if (newQuantity >= 1) {
      const updatedCart = cartItem.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      updateCart(updatedCart);
    }
  };
  return (
    <>
      <HeaderNav />
      <div className={"collection mt-5"}>
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

                        {/* Submenu */}
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
                                onClick={() =>
                                  toggleSubMenu(
                                    subIndex,
                                    item.categoryId,
                                    item.name
                                  )
                                }
                              >
                                {item.name}
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
                  <h2 className="product_section_title">{selectedTitle}</h2>{" "}
                  {/* Title displayed here */}
                  <div className="collection_wrap wrap">
                    <div className="product_grid">
                      {products
                        .filter((product) => {
                          if (selectedMainMenu) {
                            return selectedMainMenu.includes(
                              product.categoryId
                            );
                          }
                          return (
                            selectedCategoryId === null ||
                            product.categoryId === selectedCategoryId
                          );
                        })
                        .map((product) => (
                          <div className="product_card" key={product.id}>
                            <a href={`/product/${product.productId}`}>
                              <img
                                src={product.urlImage}
                                alt={product.productName}
                              />
                              <a
                                href={`/product/${product.productId}`}
                                className={"product_name"}
                              >
                                {product.productName}
                              </a>
                              <p></p>
                              <p className={"price_product_item"}>
                                {formatCurrency(product.unitPrice)}
                              </p>
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
      <button
        className="cart-popupstyle__CartPopupBoxButton-sc-1f54a6d-0 jkHRHZ cart-popup-button product-cart react-draggable react-draggable-dragged"
        style={{ transform: "translate(-5px, -23px)" }}
        onClick={toggleCart}
      >
        <div className="cart-popupstyle__IconContainer-sc-1f54a6d-1 hyIUDY">
          <div className="custom-badge">{cartItem.length}</div>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AddShoppingCartIcon"
          >
            <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path>
          </svg>
        </div>
      </button>
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleCart}>
          &times;
        </button>
        <h2>Giỏ hàng</h2>
        <ul className="cart-items-list">
          {cartItem.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.urlImage} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p style={{ fontSize: "12px", whiteSpace: "pre-line" }}>
                  {item.toppings}
                </p>
                <p className="item-price">{item.price.toLocaleString()} VND</p>
                <div className="item-quantity">
                  <button
                    class="value-button"
                    id="decrease"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="number"
                    style={{ width: "50px" }}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  />
                  <button
                    class="value-button"
                    id="increase"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/*<IconChat/>*/}
      <Footer />
    </>
  );
};

export default Menu;
