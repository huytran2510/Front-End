import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import "../css/payment.css";
import Header from "../page/header/Header";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FaTrash} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../page/product/SearchBox";
import HeaderNav from "../page/header/HeaderNav";
import {Modal} from "react-bootstrap";
import axios from "axios";
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const Payment = () => {
    const [cartItem, setCartItem] = useState([]);
    const [totalPriceCart, setTotalPriceCart] = useState(0);
    const [totalPayment, setTotalPayment] = useState();
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [show, setShow] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [paymentInfo, setPaymentInfo] = useState(null)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');

    const handleMethodChange = (event) => {
        setSelectedMethod(event.target.id); // Lưu giá trị ID của radio được chọn
    };

    const handleShow = () => {
        if (!selectedMethod) {
            alert("Vui lòng chọn phương thức thanh toán!");
            return;
        }
        console.log("Phương thức thanh toán được chọn:", selectedMethod);
        setShow(true);
    }


    const handleClose = () => setShow(false);

    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };
    // Lấy giỏ hàng từ session storage khi component mount
    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItem(savedCart);
        calculateTotalPrice();
    }, []);

    const updateCart = (newCart) => {
        sessionStorage.setItem("cart", JSON.stringify(newCart));
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

    const handlePayment = async () => {
        try {
            const endpoint =
                selectedMethod === "ZaloPay"
                    ? `http://localhost:5000/zalopay/payment/${totalPriceCart}`
                    : `http://localhost:5000/momo/payment/${totalPriceCart}`;

            const response = await axios.post(endpoint);
            console.log("data: ", response.data)
            if (response.data) {
                let redirectUrl = "";

                // Kiểm tra phản hồi và lấy URL thanh toán
                if (selectedMethod === "MoMo" && response.data.payUrl) {
                    redirectUrl = response.data.payUrl;
                } else if (selectedMethod === "ZaloPay" && response.data.order_url) {
                    redirectUrl = response.data.order_url;
                }

                // Kiểm tra nếu có URL để chuyển hướng
                if (redirectUrl) {
                    localStorage.setItem("info", JSON.stringify({name, phone, email, note, selectedAddress}));
                    // Lấy ra từ localStorage
                    setPaymentInfo(JSON.parse(localStorage.getItem("info")));
                    console.log(`Redirect URL cho ${selectedMethod}:`, redirectUrl);
                    // Chuyển hướng người dùng tới URL thanh toán
                    window.location.href = redirectUrl;
                } else {
                    // Nếu không có URL thanh toán
                    throw new Error(`Không tìm thấy URL thanh toán cho ${selectedMethod}`);
                }
            } else {
                throw new Error("Phản hồi từ API không hợp lệ.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API thanh toán:", error);
            alert(`Có lỗi xảy ra: ${error.message}`);
        }
    };

    return (
        <>
            <HeaderNav/>
            <div className="container-lg container-fluid custom-checkout mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="tch-checkout-header mb-2">
                            <h1 className="text-center tch-checkout-title tch-checkout-title-custom mb-0">
                <span data-v-d1bcb9c8="" class="icon mr-3">
                  <FontAwesomeIcon icon={faFile}/> {/* File icon */}
                </span>
                                <span data-v-d1bcb9c8="" class="text">
                  Xác nhận đơn hàng
                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="ml-lg--50 d-block">
                        <div className="tch-checkout-box tch-checkout-box--delivery tch-checkout-border float-lg-left">
                            <div className="tch-checkout-custom-mobile d-flex justify-content-between">
                                <h4 data-v-d1bcb9c8="" class="tch-checkout-box__title">
                                    Giao hàng
                                </h4>
                            </div>
                            <div
                                data-v-d1bcb9c8=""
                                class="d-flex flex-row align-items-start tch-delivery-card tch-delivery-card--border"
                                onClick={handleOpenPopup}
                            >
                                <div data-v-d1bcb9c8="" class="tch-delivery-card__image">
                                    <img
                                        data-v-d1bcb9c8=""
                                        width="40px"
                                        src="https://minio.thecoffeehouse.com/images/tch-web-order/Delivery2.png"
                                        alt=""
                                    />
                                </div>
                                {" "}
                                <div
                                    data-v-d1bcb9c8=""
                                    data-toggle="modal"
                                    data-target="#abc"
                                    class="d-flex justify-content-between align-items-start tch-delivery-card__content"
                                >
                                    <div data-v-d1bcb9c8="">
                                        <h5
                                            data-v-d1bcb9c8=""
                                            class="tch-delivery-card__title mb-0"
                                        >
                                            Địa chỉ
                                        </h5>{" "}
                                        <p
                                            data-v-d1bcb9c8=""
                                            class="tch-delivery-card__description mb-0"
                                        >
                                            {selectedAddress}
                                        </p>
                                    </div>
                                    {" "}
                                    <span data-v-d1bcb9c8="" class="icon mt-2">
                    {/* <i
                      data-v-d1bcb9c8=""
                      aria-hidden="true"
                      class="fa fa-chevron-right"
                    ></i> */}
                                        <FontAwesomeIcon icon={faChevronRight}/>
                  </span>
                                </div>
                            </div>
                            <div data-v-d1bcb9c8="" class="form-group">
                                <input
                                    data-v-d1bcb9c8=""
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autocomplete="off"
                                    placeholder="Tên người nhận"
                                    class="form-control tch-delivery__input"
                                />{" "}
                                <div data-v-d1bcb9c8="" class="err err-name">
                                    Vui lòng nhập tên người nhận
                                </div>
                            </div>
                            <div data-v-d1bcb9c8="" class="form-group">
                                <input
                                    data-v-d1bcb9c8=""
                                    type="text"
                                    id="phone"
                                    autocomplete="off"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Số điện thoại"
                                    class="form-control tch-delivery__input"
                                />{" "}
                                <div data-v-d1bcb9c8="" class="err err-name">
                                    Vui lòng nhập số điện thoại
                                </div>
                            </div>
                            <div data-v-d1bcb9c8="" class="form-group">
                                <input
                                    data-v-d1bcb9c8=""
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    autocomplete="off"
                                    placeholder="Email"
                                    class="form-control tch-delivery__input"
                                />{" "}
                                <div data-v-d1bcb9c8="" class="err err-name">
                                    Vui lòng nhập email
                                </div>
                            </div>
                            <div data-v-d1bcb9c8="" class="form-group">
                                <input
                                    data-v-d1bcb9c8=""
                                    type="text"
                                    id="name"
                                    autocomplete="off"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Thêm hướng dẫn giao hàng"
                                    class="form-control tch-delivery__input"
                                />{" "}
                                <div data-v-d1bcb9c8="" class="err err-name">
                                    Thêm hướng dẫn giao hàng
                                </div>
                            </div>
                        </div>
                        <div
                            className="d-none tch-checkout-box tch-checkout-box--lg-shadowbox d-lg-block float-lg-right pb-0 pt-0">
                            <div className="ptl-20">
                                <div
                                    className="tch-checkout-box tch-checkout-box--list-ordered tch-checkout-border w-100">
                                    <div
                                        data-v-d1bcb9c8=""
                                        class="d-flex justify-content-between"
                                    >
                                        <h4 data-v-d1bcb9c8="" class="tch-checkout-box__title mb-0">
                                            Các món đã chọn
                                        </h4>
                                        <a
                                            data-v-d1bcb9c8=""
                                            href="/product-listing"
                                            style={{textDecoration: "none", color: "black"}}
                                        >
                                            <p
                                                data-v-d1bcb9c8=""
                                                class="tch-checkout-box__btn-outline"
                                            >
                                                Thêm món
                                            </p>
                                        </a>
                                    </div>
                                    {cartItem.length === 0 ? (
                                        <div
                                            className="cart-empty container d-flex flex-column justify-content-center align-items-center">
                                            <div className="img-cart-empty"></div>
                                            <button>TIẾP TỤC MUA HÀNG</button>
                                        </div>
                                    ) : (
                                        cartItem.map((item, index) => (
                                            <div
                                                data-v-d1bcb9c8=""
                                                data-toggle="modal"
                                                data-target="#cardModal"
                                                class="tch-order-card d-flex align-items-center justify-content-between"
                                            >
                                                <div
                                                    data-v-d1bcb9c8=""
                                                    class="tch-order-card__left d-flex"
                                                >
                          <span
                              data-v-d1bcb9c8=""
                              class="tch-order-card__icon d-flex align-items-center"
                          >
                            <i
                                data-v-d1bcb9c8=""
                                aria-hidden="true"
                                class="fa fa-pen"
                            ></i>
                          </span>{" "}
                                                    <div
                                                        data-v-d1bcb9c8=""
                                                        class="tch-order-card__content"
                                                    >
                                                        <h5
                                                            data-v-d1bcb9c8=""
                                                            class="tch-order-card__title mb-0"
                                                        >
                                                            {item.quantity} x {item.name}
                                                        </h5>{" "}
                                                        <p
                                                            data-v-d1bcb9c8=""
                                                            class="tch-order-card__description mb-0"
                                                        >
                                                            {item.size}
                                                        </p>
                                                        <p
                                                            data-v-d1bcb9c8=""
                                                            class="tch-order-card__description mb-0"
                                                        >
                                                            Shot Espresso
                                                        </p>{" "}
                                                        <p
                                                            data-v-d1bcb9c8=""
                                                            class="tch-order-delete-item"
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                        >
                                                            Xóa
                                                        </p>
                                                    </div>
                                                </div>
                                                {" "}
                                                <div data-v-d1bcb9c8="" class="tch-order-card__right">
                                                    <p
                                                        data-v-d1bcb9c8=""
                                                        class="tch-order-card__price mb-0"
                                                    >
                                                        {item.totalPrice.toLocaleString()}₫
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div
                                    data-v-d1bcb9c8=""
                                    class="tch-checkout-box tch-checkout-box--list-total tch-checkout-border w-100"
                                >
                                    <div data-v-d1bcb9c8="" class="mb--12">
                                        <h4 data-v-d1bcb9c8="" class="tch-checkout-box__title">
                                            Tổng cộng
                                        </h4>
                                    </div>
                                    <div
                                        data-v-d1bcb9c8=""
                                        data-toggle="modal"
                                        data-target="#delivery-time"
                                        class="tch-order-card tch-order-card--border d-flex align-items-center justify-content-between"
                                    >
                                        <div data-v-d1bcb9c8="" class="tch-order-card__left d-flex">
                                            <p data-v-d1bcb9c8="" class="tch-order-card__text mb-0">
                                                Thành tiền
                                            </p>
                                        </div>
                                        <div data-v-d1bcb9c8="" class="tch-order-card__right">
                                            <p data-v-d1bcb9c8="" class="tch-order-card__price mb-0">
                                                {totalPriceCart.toLocaleString()}đ
                                            </p>
                                        </div>
                                    </div>
                                    {" "}
                                    <div
                                        data-v-d1bcb9c8=""
                                        class="tch-order-card d-flex align-items-center justify-content-between"
                                    >
                                        <div data-v-d1bcb9c8="" class="tch-order-card__left d-flex">
                                            <p data-v-d1bcb9c8="" class="tch-order-card__text mb-0">
                                                Phí giao hàng
                                            </p>
                                        </div>
                                        {" "}
                                        <div data-v-d1bcb9c8="" class="tch-order-card__right">
                                            <p data-v-d1bcb9c8="" class="tch-order-card__price mb-0">
                                                25.000đ
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        data-v-d1bcb9c8=""
                                        data-toggle="modal"
                                        data-target="#sale-modal"
                                        class="tch-order-card d-flex align-items-center justify-content-between cursor-pointer"
                                    >
                                        <div
                                            data-v-d1bcb9c8=""
                                            class="tch-order-card__left tch-order-tch-order-card__left-custom-custom"
                                            style={{flex: "1 1 0%"}}
                                        >
                                            <p
                                                data-v-d1bcb9c8=""
                                                class="tch-order-card__text orange mb-0"
                                            >
                                                Khuyến mãi
                                            </p>{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                data-v-d1bcb9c8=""
                                class="tch-checkout-box tch-checkout-box--list-submited d-flex justify-content-between w-100 position-static"
                            >
                                <div data-v-d1bcb9c8="">
                                    <p
                                        data-v-d1bcb9c8=""
                                        class="tch-order-card__text text-white mb-0"
                                    >
                                        Thành tiền
                                    </p>{" "}
                                    <p
                                        data-v-d1bcb9c8=""
                                        class="tch-order-card__text text-white f-600 mb-0"
                                    >
                                        {(totalPriceCart + 25000).toLocaleString()}đ
                                    </p>
                                </div>
                                {" "}
                                <button
                                    data-v-d1bcb9c8=""
                                    type="button"
                                    class="btn btn--white text-orange btn--radius-100"
                                    variant="contained" color="primary" onClick={handleShow}
                                >
                                    Đặt hàng
                                </button>
                                <Modal show={show} onHide={handleClose} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xác nhận đặt hàng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Vui lòng xác nhận đặt hàng</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Đóng
                                        </Button>
                                        <Button variant="primary" onClick={handlePayment}>
                                            Xác nhận
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div
                            className="tch-checkout-box tch-checkout-box--list-method tch-checkout-border float-lg-left">
                            <div>
                                <div data-v-d1bcb9c8="" class="mb--12">
                                    <h4
                                        data-v-d1bcb9c8=""
                                        class="tch-checkout-box__title mb-0 mb-0"
                                    >
                                        Phương thức thanh toán
                                    </h4>
                                </div>
                                <ul className="tch-list-payment-method mb-0">
                                    <li data-v-d1bcb9c8="" class="tch-payment-method-item">
                                        <div
                                            data-v-d1bcb9c8=""
                                            class="custom-control custom-radio mb-0"
                                        >
                                            <input
                                                data-v-d1bcb9c8=""
                                                type="radio"
                                                name="payment-method"
                                                id="COD"
                                                class="custom-control-input"
                                                onChange={handleMethodChange}
                                            />{" "}
                                            <label
                                                data-v-d1bcb9c8=""
                                                for="COD"
                                                class="custom-control-label tch-custom-radio"
                                                style={{paddingLeft: "6px"}}
                                            >
                        <span data-v-d1bcb9c8="" class="icon ml-3 mr-2">
                          <img
                              data-v-d1bcb9c8=""
                              src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg"
                              alt=""
                          />
                        </span>
                                                <span data-v-d1bcb9c8="" class="text">
                          Tiền mặt
                        </span>{" "}
                                            </label>
                                        </div>
                                    </li>
                                    <li data-v-d1bcb9c8="" class="tch-payment-method-item">
                                        <div
                                            data-v-d1bcb9c8=""
                                            class="custom-control custom-radio mb-0"
                                        >
                                            <input
                                                data-v-d1bcb9c8=""
                                                type="radio"
                                                name="payment-method"
                                                id="MoMo"
                                                class="custom-control-input"
                                                onChange={handleMethodChange}
                                            />{" "}
                                            <label
                                                data-v-d1bcb9c8=""
                                                for="MoMo"
                                                class="custom-control-label tch-custom-radio"
                                                style={{paddingLeft: "6px"}}
                                            >
                        <span data-v-d1bcb9c8="" class="icon ml-3 mr-2">
                          <img
                              data-v-d1bcb9c8=""
                              src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
                              alt=""
                          />
                        </span>
                                                <span data-v-d1bcb9c8="" class="text">
                          MoMo
                        </span>{" "}
                                            </label>
                                        </div>
                                    </li>
                                    <li data-v-d1bcb9c8="" class="tch-payment-method-item">
                                        <div
                                            data-v-d1bcb9c8=""
                                            class="custom-control custom-radio mb-0"
                                        >
                                            <input
                                                data-v-d1bcb9c8=""
                                                type="radio"
                                                name="payment-method"
                                                onChange={handleMethodChange}
                                                id="ZaloPay"
                                                class="custom-control-input"
                                            />{" "}
                                            <label
                                                data-v-d1bcb9c8=""
                                                for="ZaloPay"
                                                class="custom-control-label tch-custom-radio"
                                                style={{paddingLeft: "6px"}}
                                            >
                        <span data-v-d1bcb9c8="" class="icon ml-3 mr-2">
                          <img
                              data-v-d1bcb9c8=""
                              src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
                              alt=""
                          />
                        </span>
                                                <span data-v-d1bcb9c8="" class="text">
                          ZaloPay
                        </span>{" "}
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="tch-checkout-box tch-checkout-box--remove-card float-lg-right"
                            data-v-d1bcb9c8=""
                            class="tch-checkout-box tch-checkout-box--remove-card float-lg-right"
                        >
                            <p
                                data-v-d1bcb9c8=""
                                class="tch-checkout-box__text text-center mb-0"
                            >
                <span data-v-d1bcb9c8="" class="icon mr-2">
                  <i
                      data-v-d1bcb9c8=""
                      aria-hidden="true"
                      class="fa fa-trash"
                  ></i>
                  <FaTrash className="fa fa-trash"/>
                </span>
                                <span data-v-d1bcb9c8="">Xóa đơn hàng</span>
                            </p>
                        </div>
                        {/* Hiển thị popup SearchBox nếu isPopupVisible = true */}
                        {isPopupVisible && (
                            <SearchBox
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                                onClose={handleClosePopup}
                            />
                        )}
                        {/* Modal popup comfirm order */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
