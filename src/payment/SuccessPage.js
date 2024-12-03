import React, { useEffect, useState } from "react";
import "./../css/sucessPage.css";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../util/useLocalStorage";
import ajax from "../ajax/fetchService";

const SuccessPage = () => {
  const location = useLocation();
  const [cartItems, setCartItem] = useState([]);
  const [jwt,setJwt] = useLocalStorage("","jwt")
  const [order, setOrder] = useState({
    orderId: '',  // orderId sẽ được lấy từ server
    shipAddress: '',
    firstName: '',
    lastName: '',
    shipPhone: '',
    shippedDate: new Date().toISOString().slice(0, 10), // Set default date
    email: '',
    priceDiscount: 0,
    discount: 0,
    note: '',
});
  const [paymentData, setPaymentData] = useState(null);
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItem(savedCart);
}, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Lấy giá trị để kiểm tra loại thanh toán
    const partnerCode = queryParams.get("partnerCode"); // Nếu có, đây là MoMo
    const appid = queryParams.get("appid"); // Nếu có, đây là Zalo

    let data = {};

    if (partnerCode) {
      // Trường hợp MoMo
      data = {
        orderId: "MOMO" + new Date().getTime(),
        amount: queryParams.get("amount"),
      };
    } else if (appid) {
      // Trường hợp Zalo
      data = {
        orderId: "ZALO" + new Date().getTime(),
        amount: queryParams.get("amount"),
      };
    }
    let cartItemsDTO = cartItems.map(item => convertToCartItemDTO(item));


    

    if (cartItems.length > 0) {
        // Gọi API lưu giỏ hàng
        const orderRequest = {
            cOrder: order,  // Đơn hàng
            cartItems: cartItemsDTO  // Danh sách CartItemDTO
          };

        ajax('/api/place-order', jwt, 'POST', orderRequest)
            .then((data) => {
                console.log('Order placed successfully:', data);
            })
            .catch((error) => {
                console.error('Error placing order:', error);
            });
    }

    setPaymentData(data);
  }, [location]);


  function convertToCartItemDTO(cartItem) {
    return {
      productId: cartItem.productId,
      productName: cartItem.productName,
      quantity: cartItem.quantity,
      price: cartItem.price,
      size: cartItem.size,
      topping: cartItem.topping,
      imgUrl: cartItem.imgUrl
    };
  }
  return (
    <div
      className="container"
      style={{
        background: "#dcf0fa",
        maxWidth: "380px",
        margin: "50px auto",
        overflow: "hidden",
      }}
    >
      <div className="printer-top"></div>

      <div className="paper-container">
        <div className="printer-bottom"></div>

        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Thanh toán hoàn tất</div>
            <div className="success-description">
              Cảm ơn bạn đã hoàn tất thanh toán! Bạn sẽ sớm nhận được email
              thanh toán của mình.{" "}
            </div>
            <div className="order-details">
              {!paymentData ? (
                <div>Đang xử lý thanh toán...</div>
              ) : (
                <>
                  <div className="order-number-label">
                    Mã Hóa Đơn: {paymentData.orderId}
                  </div>
                  <div className="order-number-label">
                    Số tiền đã thanh toán: <p>{paymentData.amount.toLocaleString()}VNĐ</p>
                  </div>
                </>
              )}
              <div className="complement">Cảm Ơn Quý Khách!</div>
            </div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
