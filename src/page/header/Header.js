import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "../../css/header.css"

const Header = () => {
    const [hidden, setHidden] = useState(true);

    return (
        <header class={""} style={headerStyle}>
            <div style={header_nav}>
                <div className={"header_logo"}>
                    <img src={"https://static.vecteezy.com/system/resources/previews/007/655/667/non_2x/coffee-shop-logo-with-cup-line-style-isolated-on-background-for-cafe-shop-restaurant-vector.jpg"} />
                </div>
                <div className={"header_menu"}>
                    <nav>
                        <ul style={navListStyle}>
                            <li><Link to="/coffee" style={linkStyle}>Cà phê</Link></li>
                            <li><Link to="/tea" style={linkStyle}>Trà</Link></li>
                            <li><Link to="/menu" style={linkStyle}>
                                Menu
                                <svg width="6" height="4" viewBox="0 0 6 4" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.99992 3.33332L0.333252 0.666656H5.66659L2.99992 3.33332Z" fill="black"
                                          fill-opacity="0.6"></path>
                                </svg>
                            </Link></li>
                            <li class="clearfix nav-item"
                            >
                                <Link to="/stories" style={linkStyle} class="nav-link">
                                    Chuyện nhà
                                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.99992 3.33332L0.333252 0.666656H5.66659L2.99992 3.33332Z"
                                              fill="black" fill-opacity="0.6"></path>
                                    </svg>
                                </Link>
                                <ul class="menu_child" id="menu_child_5_5">

                                    <li class="lv2_title">
                                        <a href="/pages/chuyen-ca-phe-va-tra?b=1000676335"
                                           title="Coffeeholic">Coffeeholic</a>
                                        <ul class="menu_child_lv3">
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676335&amp;h=chuyencaphe"
                                                   title="Chuyện Cà Phê">
                                                    #chuyencaphe
                                                </a>
                                            </li>
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676335&amp;h=phacaphe"
                                                   title="Pha Cà Phê">
                                                    #phacaphe
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="lv2_title">
                                        <a href="/pages/chuyen-ca-phe-va-tra?b=1000676336" title="Teaholic">Teaholic</a>
                                        <ul class="menu_child_lv3">
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676336&amp;h=phatra"
                                                   title="Pha Trà">
                                                    #phatra
                                                </a>
                                            </li>
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676336&amp;h=cauchuyenvetra"
                                                   title="Câu chuyện về trà">
                                                    #cauchuyenvetra
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="lv2_title">
                                        <a href="/pages/chuyen-ca-phe-va-tra?b=1000676337" title="Blog">Blog</a>
                                        <ul class="menu_child_lv3">
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676337&amp;h=inthemood"
                                                   title="In The Mood">
                                                    #inthemood
                                                </a>
                                            </li>
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676337&amp;h=Review"
                                                   title="Review">
                                                    #Review
                                                </a>
                                            </li>
                                            <li class="lv3_title">
                                                <a href="/pages/chuyen-ca-phe-va-tra?b=1000676337&amp;h=HumanofTCH"
                                                   title="Human of TCH">
                                                    #HumanofTCH
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><Link to="/about" style={linkStyle}>About us</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
};

const header_nav = {
    display: "flex",
    flexDirection : "row",
    justifyContent: "center",
    alignItems:"center"
}

const headerStyle = {
    position: 'sticky',
    background: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    left: 0,
    zIndex: 999,
    height: '60px',
    width: '100%',
    borderBottom: "1px solid #00000026",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
};


const navListStyle = {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    color: 'black'
};

const linkStyle = {
    margin: '0 1rem',
    color: 'black',
    textDecoration: 'none',
};

export default Header;