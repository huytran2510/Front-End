import React, {useState} from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../css/menu.css"

const Menu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const menuItems = [
        {
            name: 'Cà Phê',
            subMenu: ['Bánh mặn', 'Bánh ngọt', 'Bánh Pastry']
        },
        {
            name: 'Trà',
            subMenu: ['qq', 'Bánh ngọt', 'Bánh Pastry']
        }
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
    return (
        <>
            <Header/>
            <div className={"collection"}>
                <div className={"collection_menu_wrap"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-lg-3 col-md-3 col-sm-12 col-xs-12 stikySidebar"}>

                                <aside className={"sidebar_menu"}>
                                    <ul>
                                        {menuItems.map((menu, index) => (
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    className={activeMenu === index ? 'child_active' : ''}
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    {menu.name}
                                                </a>

                                                {/* Menu con */}
                                                <ul className={`sidebar_menu_lv2 ${activeMenu === index ? 'show' : ''}`}>
                                                    {menu.subMenu.map((item, subIndex) => (
                                                        <li key={subIndex}>
                                                            <a
                                                                href="#"
                                                                className={activeSubMenu === subIndex ? 'child_active' : ''}
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
                            <div className={"col-lg-9 col-md-9 col-sm-12 col-xs-12 border_right_before"}>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Menu