import React from "react";
import "../../css/FindOrder.css";
import Header from "../header/Header";
import HeaderNav from "../header/HeaderNav";

import { FaSearch } from "react-icons/fa";
const FindOrder = () => {
  const order = {
    orderId: "HD202411261234",
    phone: "0123456789",
    totalValue: "1.200.000",
    deliveryTime: "27/11/2024 - 14:00",
  };
  return (
    <>
      <HeaderNav />
      <div data-v-0abb232b="" class="container-lg container-fluid">
        <div class="history-wrapper">
          <h1 class="text-center tch-tracking-title mb-0">
            <img
              src="https://order.thecoffeehouse.com/_nuxt/img/search-order-icon.03a807c.svg"
              alt=""
            />{" "}
            <span class="text-title">Tra cứu đơn hàng</span>
          </h1>{" "}
          <div>
            <div data-v-4be810d4="">
              <div data-v-4be810d4="" class="card-product-note-item">
                <input
                  data-v-4be810d4=""
                  type="text"
                  placeholder="Tra cứu đơn hàng theo số điện thoại"
                  class="card-product-text"
                />{" "}
                <FaSearch
                  data-v-4be810d4=""
                  class="fa fa-search card-product-note-icon"
                />
              </div>{" "}
              <div data-v-4be810d4="" class="card-history">
                <ul data-v-4be810d4="" class="card-history-list"></ul>
              </div>
            </div>{" "}
          </div>{" "}
          <div className="order-tracking-container">
            <h2>Theo dõi đơn hàng</h2>
            <div className="order-info">
              <div className="info-row">
                <span className="label">Mã đơn hàng:</span>
                <span className="value">{order.orderId || "Chưa có"}</span>
              </div>
              <div className="info-row">
                <span className="label">Số điện thoại:</span>
                <span className="value">{order.phone || "Chưa có"}</span>
              </div>
              <div className="info-row">
                <span className="label">Trị giá:</span>
                <span className="value">{order.totalValue || "0"} VNĐ</span>
              </div>
              <div className="info-row">
                <span className="label">Thời gian vận chuyển:</span>
                <span className="value">
                  {order.deliveryTime || "Đang cập nhật"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindOrder;
