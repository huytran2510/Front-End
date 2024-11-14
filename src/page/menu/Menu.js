import React, {useEffect, useState} from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../css/menu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ajax from "../../ajax/fetchService";
import IconChat from "../chat/IconChat";
import ChatComponent from "../chat/ChatComponent";

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
    const menuItems = [
        {
            name: "Cà Phê",
            categoryId: 1,
            subMenu: ["Cà Phê Highlight", "Cà Phê Việt Nam", "Cà Phê Máy", "Cold Brew"],
        },
        {
            name: "Trái Cây Xay 0°C",
            categoryId: 2,
            subMenu: ["Trái Cây Xay 0°C "],
        },
        {
            name: "Trà Trái Cây - HiTea",
            categoryId: 3,
            subMenu: ["Trà Trái Cây - HiTea "],
        },
        {
            name: "Trà Sữa",
            categoryId: 4,
            subMenu: ["Trà Sữa"],
        },
        {
            name: "Trà Xanh - Chocolate",
            categoryId: 5,
            subMenu: ["Trà Xanh Tây Bắc", "Chocolate"],
        },
        {
            name: "Thức Uống Đá Xay",
            categoryId: 6,
            subMenu: ["Đá Xay Frosty"],
        },
        {
            name: "Bánh & Snack",
            categoryId: 7,
            subMenu: ["Bánh Mặn", "Baánh Ngọt", "Bánh Pastry"],
        },
        {
            name: "Thưởng Thức Tại Nhà",
            categoryId: 8,
            subMenu: ["Cà Phê Tại Nhà"],
        },
    ];
    const toggleMenu = (index, categoryId) => {
        if (activeMenu === index) {
            setActiveMenu(null);
            setSelectedCategoryId(null); // Deselect category
        } else {
            setActiveMenu(index);
            setSelectedCategoryId(categoryId); // Set selected category
        }
    };
    const toggleSubMenu = (subIndex) => {
        if (activeSubMenu === subIndex) {
            setActiveSubMenu(null); // Nếu đã chọn menu con này, bỏ chọn
        } else {
            setActiveSubMenu(subIndex); // Mở menu con mới
        }
    };
    const [products, setProducts] = useState([])
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
    return (
        <>
            <Header/>
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
                                                    onClick={() => toggleMenu(index, menu.categoryId)}
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
                                            {products
                                                .filter((product) => selectedCategoryId === null || product.categoryId === selectedCategoryId)
                                                .map((product) => (
                                                    <div className="product_card" key={product.id}>
                                                        <a>
                                                            <img
                                                                src={product.urlImage}
                                                                alt={product.productName}
                                                            />
                                                            <a className={"product_name"}>{product.productName}</a>
                                                            <p>{formatCurrency(product.unitPrice)}</p>
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
                className="cart-popupstyle__CartPopupBoxButton-sc-1f54a6d-0 jkHRHZ product-cart react-draggable react-draggable-dragged"
                style={{transform: "translate(-5px, -23px)"}}>
                <div className="cart-popupstyle__IconContainer-sc-1f54a6d-1 hyIUDY">
                    <div className="custom-badge">0</div>
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon css-vubbuv" focusable="false"
                         aria-hidden="true" viewBox="0 0 24 24" data-testid="AddShoppingCartIcon">
                        <path
                            d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path>
                    </svg>
                </div>
            </button>
            {/*<IconChat/>*/}
            <Footer/>
        </>
    );
};

export default Menu;
