import React, {useEffect, useState} from "react";
import "../../css/cart.css";
import Header from "../header/Header";
import HeaderNav from "../header/HeaderNav";

const ShoppingCart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [totalPriceCart, setTotalPriceCart] = useState(0);

    // Lấy giỏ hàng từ session storage khi component mount
    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItem(savedCart);
        calculateTotalPrice();
    }, []);

    const updateCart = (newCart) => {
        sessionStorage.setItem("cart", JSON.stringify(newCart));
        localStorage.setItem("cart", JSON.stringify(newCart))
        setCartItem(newCart);
    };

    // i want handle calculating total price in the cart
    useEffect(() => {
        calculateTotalPrice(); // Tính tổng giá khi cartItem thay đổi
    }, [cartItem]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItem.forEach((item) => {
            totalPrice += item.totalPrice * item.quantity; // Tính giá
        });
        setTotalPriceCart(totalPrice); // Cập nhật tổng giá
    };


    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItem.filter((item) => item.id !== id); // Xóa sản phẩm dựa trên id
        updateCart(updatedCart); // Cập nhật lại giỏ hàng
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItem.map((item) =>
            item.id === id && item.quantity > 1
                ? {...item, quantity: item.quantity - 1}
                : item
        );
        updateCart(updatedCart); // Cập nhật lại giỏ hàng
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItem.map((item) =>
            item.id === id ? {...item, quantity: item.quantity + 1} : item
        );
        updateCart(updatedCart); // Cập nhật lại giỏ hàng
    };
    return (
        <>
            <HeaderNav/>
            <section class="bread-crumb mt-5">
                <div class="container">
                    <ul
                        class="breadcrumb"
                        itemscope=""
                        itemtype="https://schema.org/BreadcrumbList"
                    >
                        <li
                            class="home"
                            itemprop="itemListElement"
                            itemscope=""
                            itemtype="https://schema.org/ListItem"
                        >
                            <a itemprop="item" href="/" title="Trang chủ">
                                <span itemprop="name">Trang chủ</span>
                                {/* <meta itemprop="position" content="1"> */}
                            </a>
                        </li>
                        <li
                            itemprop="itemListElement"
                            itemscope=""
                            itemtype="https://schema.org/ListItem"
                        >
                            <strong itemprop="name">Giỏ hàng</strong>
                            {/* <meta itemprop="position" content="2"> */}
                        </li>
                    </ul>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="cart_body">
                            <h1 className="lbl-shopping-cart lbl-shopping-cart-gio-hang ">
                                Giỏ hàng ({cartItem.length} Sản phẩm)
                            </h1>
                            {cartItem.length === 0 ? (
                                <div
                                    className="cart-empty container d-flex flex-column justify-content-center align-items-center">
                                    <div className="img-cart-empty"></div>
                                    <button>TIẾP TỤC MUA HÀNG</button>
                                </div>
                            ) : (
                                cartItem.map((item, index) => (
                                    <div
                                        className="row shopping_cart product"
                                        key={item.id || index}
                                    >
                                        <div className="col-lg-3 float-start">
                                            <p className="image">
                                                <img src={item.urlImage} alt={item.name}/>
                                            </p>
                                        </div>
                                        <div className="col-lg-9 d-flex flex-row">
                                            <div className="box-info-product">
                                                <p className="name">
                                                    <a>{item.name}</a>
                                                </p>
                                                <p style={{fontSize: "12px"}}>
                                                    {item.toppings.map((topping, index) => (
                                                        <span key={index}>
                              {topping}
                                                            <br/>
                            </span>
                                                    ))}
                                                </p>
                                                <p style={{fontSize: "12px", whiteSpace: "pre-line"}}>
                                                    {item.size}
                                                </p>
                                                <p
                                                    className="action-delete"
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                >
                                                    Xóa
                                                </p>
                                            </div>
                                            <div className="box-price">
                                                <p className="price">{item.totalPrice.toLocaleString()}₫</p>
                                            </div>
                                            <div className="box-quantity">
                                                {/* Buttons for quantity control */}
                                                <button
                                                    className="action-add"
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="input-amount"
                                                />
                                                <button
                                                    className="action-add"
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="col-lg-12">
                            <div id="right-affix">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <a
                                            class="btn-proceed-checkout btn-checkouts"
                                            title="Tiếp tục mua hàng"
                                            href="collections/all"
                                        >
                                            Tiếp tục mua hàng
                                        </a>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="each-row">
                                            <div class="box-style fee">
                                                <p class="list-info-price">
                                                    <span>Tạm tính: </span>
                                                    <strong class="totals_price price _text-right text_color_right1">
                                                        {totalPriceCart.toLocaleString()}₫
                                                    </strong>
                                                </p>
                                            </div>
                                            <div class="box-style fee d-none">
                                                <p class="list-info-price">
                                                    <span>Giảm giá: </span>
                                                    <strong
                                                        class="discounted price _text-right text_color_right1"
                                                        id="price_sale"
                                                        data-price="0"
                                                    ></strong>
                                                </p>
                                            </div>
                                            <div class="box-style fee">
                                                <div class="total2 clearfix">
                                                    <span class="text-label">Thành tiền: </span>
                                                    <div class="amount">
                                                        <p>
                                                            <strong class="totals_price">
                                                                {totalPriceCart.toLocaleString()}₫
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                class="button btn btn-large btn-block btn-danger btn-checkout evo-button"
                                                title="Thanh toán ngay"
                                                type="button"
                                                onClick={() => {
                                                    window.location.href = '/payment';
                                                }}>
                                                Thanh toán ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div class="side-module block">
                            <div class="content-asset">
                                <div class="service-module service-closed">
                                    <h3>Dịch vụ khách hàng</h3>
                                    <p>Bạn cần sự hỗ trợ từ chúng tôi? Hãy liên hệ ngay</p>
                                    <ul>
                                        <li>
                                            <a href="tel:0917561212" title="Hotline 0917561212">
                                                <svg
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 480.56 480.56"
                                                    style={{enableBackground: "new 0 0 480.56 480.56"}}
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M365.354,317.9c-15.7-15.5-35.3-15.5-50.9,0c-11.9,11.8-23.8,23.6-35.5,35.6c-3.2,3.3-5.9,4-9.8,1.8
												 c-7.7-4.2-15.9-7.6-23.3-12.2c-34.5-21.7-63.4-49.6-89-81c-12.7-15.6-24-32.3-31.9-51.1c-1.6-3.8-1.3-6.3,1.8-9.4
												 c11.9-11.5,23.5-23.3,35.2-35.1c16.3-16.4,16.3-35.6-0.1-52.1c-9.3-9.4-18.6-18.6-27.9-28c-9.6-9.6-19.1-19.3-28.8-28.8
												 c-15.7-15.3-35.3-15.3-50.9,0.1c-12,11.8-23.5,23.9-35.7,35.5c-11.3,10.7-17,23.8-18.2,39.1c-1.9,24.9,4.2,48.4,12.8,71.3
												 c17.6,47.4,44.4,89.5,76.9,128.1c43.9,52.2,96.3,93.5,157.6,123.3c27.6,13.4,56.2,23.7,87.3,25.4c21.4,1.2,40-4.2,54.9-20.9
												 c10.2-11.4,21.7-21.8,32.5-32.7c16-16.2,16.1-35.8,0.2-51.8C403.554,355.9,384.454,336.9,365.354,317.9z"
                                                    ></path>
                                                    <path
                                                        d="M346.254,238.2l36.9-6.3c-5.8-33.9-21.8-64.6-46.1-89c-25.7-25.7-58.2-41.9-94-46.9l-5.2,37.1
												 c27.7,3.9,52.9,16.4,72.8,36.3C329.454,188.2,341.754,212,346.254,238.2z"
                                                    ></path>
                                                    <path
                                                        d="M403.954,77.8c-42.6-42.6-96.5-69.5-156-77.8l-5.2,37.1c51.4,7.2,98,30.5,134.8,67.2c34.9,34.9,57.8,79,66.1,127.5
												 l36.9-6.3C470.854,169.3,444.354,118.3,403.954,77.8z"
                                                    ></path>
                                                </svg>
                                                {" "}
                                                0917561212
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                class="text-link"
                                                href="https://www.facebook.com/shophighlandscoffee"
                                                target="_blank"
                                                title="Chúng tôi trên Facebook"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink" // Sửa xmlns:xlink thành xmlnsXlink
                                                    width="25px"
                                                    height="25px"
                                                    viewBox="0 0 96.124 96.123"
                                                    style={{enableBackground: "new 0 0 96.124 96.123"}} // Chuyển style thành object
                                                    xmlSpace="preserve" // Sửa xml:space thành xmlSpace
                                                >
                                                    <path
                                                        d="M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803   c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654   c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246   c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z"
                                                        data-original="#000000"
                                                        class="active-path"
                                                        data-old_color="#000000"
                                                        fill="#EBE7E7"
                                                    ></path>
                                                </svg>
                                                {" "}
                                                Chúng tôi trên Facebook
                                            </a>
                                        </li>
                                    </ul>
                                    <p>Giờ mở cửa (08:00 - 18:00 tối)</p>
                                    <a class="text-links" href="/lien-he" title="Liên hệ">
                                        Liên hệ
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="side-module block usp-payment-module margin-bottom-0">
                            <div class="content-asset">
                                <h3>Mua sắm cùng Ant Home</h3>
                                <ul class="usp-list">
                                    <li>
                    <span class="color-grey-dark">
                      Sản phẩm đẹp, thân thiện với môi trường
                    </span>
                                        <p></p>
                                    </li>

                                    <li>
                                        <span class="color-grey-dark">Không lo về giá</span>
                                        <p></p>
                                    </li>

                                    <li>
                                        <span class="color-grey-dark">Miễn phí vận chuyển</span>
                                        <p>cho đơn hàng từ 1.500.000 VNĐ</p>
                                    </li>
                                </ul>
                                <ul class="payment">
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/465/740/themes/884110/assets/cart_payment_1.svg?1732155712886"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/465/740/themes/884110/assets/cart_payment_2.svg?1732155712886"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/465/740/themes/884110/assets/cart_payment_3.svg?1732155712886"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                    <li>
                                        <img
                                            src="//bizweb.dktcdn.net/100/465/740/themes/884110/assets/cart_payment_4.svg?1732155712886"
                                            alt="Hình thức thanh toán"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
