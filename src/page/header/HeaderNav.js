import React, { useEffect, useState } from "react";
import "../../css/headerNav.css";
import SearchBox from "../product/SearchBox";
import Logo from "../../asset/Shop.png"
const HeaderNav = () => {
  const [cartItem, setCartItem] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Thay đổi trạng thái hiển thị
  };
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItem(savedCart);
  }, []);
  return (
    <header className="bg-header d-flex align-items-center header-phone">
      <div className="container-fluid container-lg d-flex align-items-center">
        <a data-v-42ae8b8a="" href="/" class="header-logo mr-4">
          <img
            data-v-42ae8b8a=""
            src={Logo}
            alt=""
            class="desktop-logo"
            style={{ width: "170px", height: "74px" }}
          />
        </a>

        <div
          data-v-42ae8b8a=""
          class="header-delivery header-delivery--desktop header-delivery--bg d-lg-flex align-items-center"
          onClick={handleOpenPopup}
        >
          <img
            data-v-42ae8b8a=""
            src="https://minio.thecoffeehouse.com/images/tch-web-order/Delivery2.png"
            alt=""
            class="icon-delivery"
          />{" "}
          <div
            data-v-42ae8b8a=""
            data-toggle="modal"
            data-target="#search-modal"
            class="header-delivery_content pl-2"
          >
            <h5 data-v-42ae8b8a="">Giao hàng</h5>{" "}
            <p data-v-42ae8b8a="" class="text-limit-1-line">
              Tại:{" "}
              {selectedAddress
                ? `${selectedAddress}`
                : "Nhập địa chỉ giao hàng"}
            </p>
          </div>{" "}
          <img
            data-v-42ae8b8a=""
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEzIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02LjUgNC40NTQ4N0wxMS4xNjY5IDBMMTIuNSAxLjI3MjU2TDYuNSA3TDAuNSAxLjI3MjU2TDEuODMzMTIgMEw2LjUgNC40NTQ4N1oiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4K"
            alt=""
            class="icon-vertor"
          />
        </div>

        <nav
          data-v-42ae8b8a=""
          class="navbar navbar-expand-lg d-none d-lg-inline"
        >
          <ul data-v-42ae8b8a="" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li data-v-42ae8b8a="" class="nav-item">
              <a
                data-v-42ae8b8a=""
                href="/giaohangtoanquoc"
                class="nav-link p-0"
              >
                Cà phê hạt rang
              </a>
            </li>
            <li data-v-42ae8b8a="" class="nav-item">
              <a data-v-42ae8b8a="" href="/blogs" class="nav-link p-0">
                Tin tức
              </a>
            </li>{" "}
            <li data-v-42ae8b8a="" class="nav-item">
              <a data-v-42ae8b8a="" href="/menu" class="nav-link p-0">
                Menu
              </a>
            </li>{" "}
            <li
              data-v-42ae8b8a=""
              data-toggle="modal"
              data-target="#sale-modal"
              class="nav-item p-0"
              style={{ cursor: "pointer" }}
            >
              <a data-v-42ae8b8a="" class="nav-link p-0">
                Khuyến mãi
              </a>
            </li>{" "}
            <li data-v-42ae8b8a="" class="nav-item">
              <a
                data-v-42ae8b8a=""
                target="blank"
                href="https://tuyendung.thecoffeehouse.com/"
                class="nav-link p-0"
              >
                Tuyển dụng
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-right d-flex align-items-center ml-auto block-cart-header-custom">
          <a
            data-v-42ae8b8a=""
            class="img-custom header-auth mr-2 mr-sm-2 d-flex align-items-lg-start"
            onClick={toggleVisibility}
          >
            <span
              data-v-42ae8b8a=""
              class="mr-1 mr-sm-2 mt-1 d-block icon nologin"
            >
              <img
                data-v-42ae8b8a=""
                src="https://order.thecoffeehouse.com/_nuxt/img/Login.70dc3d8.png"
                alt=""
                style={{ width: "40px" }}
              />
            </span>{" "}
          </a>

          <a
            data-v-42ae8b8a=""
            href="/cart"
            class="nav-link p-0 nuxt-link-exact-active nuxt-link-active"
            aria-current="page"
          >
            {" "}
            <div
              data-v-42ae8b8a=""
              class="icon-cart icon-cart-login-have-item d-flex align-items-center justify-content-center"
            >
              <img
                data-v-42ae8b8a=""
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxOCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDIwSDFDMC43MzQ3ODQgMjAgMC40ODA0MyAxOS44OTQ2IDAuMjkyODkzIDE5LjcwNzFDMC4xMDUzNTcgMTkuNTE5NiAwIDE5LjI2NTIgMCAxOVYxQzAgMC43MzQ3ODQgMC4xMDUzNTcgMC40ODA0MyAwLjI5Mjg5MyAwLjI5Mjg5M0MwLjQ4MDQzIDAuMTA1MzU3IDAuNzM0Nzg0IDAgMSAwSDE3QzE3LjI2NTIgMCAxNy41MTk2IDAuMTA1MzU3IDE3LjcwNzEgMC4yOTI4OTNDMTcuODk0NiAwLjQ4MDQzIDE4IDAuNzM0Nzg0IDE4IDFWMTlDMTggMTkuMjY1MiAxNy44OTQ2IDE5LjUxOTYgMTcuNzA3MSAxOS43MDcxQzE3LjUxOTYgMTkuODk0NiAxNy4yNjUyIDIwIDE3IDIwWk0xNiAxOFYySDJWMThIMTZaTTYgNFY2QzYgNi43OTU2NSA2LjMxNjA3IDcuNTU4NzEgNi44Nzg2OCA4LjEyMTMyQzcuNDQxMjkgOC42ODM5MyA4LjIwNDM1IDkgOSA5QzkuNzk1NjUgOSAxMC41NTg3IDguNjgzOTMgMTEuMTIxMyA4LjEyMTMyQzExLjY4MzkgNy41NTg3MSAxMiA2Ljc5NTY1IDEyIDZWNEgxNFY2QzE0IDcuMzI2MDggMTMuNDczMiA4LjU5Nzg1IDEyLjUzNTUgOS41MzU1M0MxMS41OTc5IDEwLjQ3MzIgMTAuMzI2MSAxMSA5IDExQzcuNjczOTIgMTEgNi40MDIxNSAxMC40NzMyIDUuNDY0NDcgOS41MzU1M0M0LjUyNjc4IDguNTk3ODUgNCA3LjMyNjA4IDQgNlY0SDZaIiBmaWxsPSIjRkI5MTFDIi8+Cjwvc3ZnPgo="
                alt=""
              />{" "}
              <div
                data-v-42ae8b8a=""
                class="icon-quatity d-flex align-items-center justify-content-center"
              >
                <span data-v-42ae8b8a="">{cartItem.length}</span>
              </div>
            </div>
          </a>
          <div className="header__option--authen" data-v-42ae8b8a style={{ display: isVisible ? "block" : "none" }}>
            <img
              data-v-42ae8b8a=""
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTUuMzg0NkwxNS4zODQ2IDBMMTYgMC42MTUzODRMMC42MTUzODQgMTZMMCAxNS4zODQ2WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTYuNjM5NzVlLTA2IDAuNjE1Mzk1TDE1LjM4NDYgMTZMMTYgMTUuMzg0NkwwLjYxNTM5MSAxLjAzNzQ2ZS0wNUw2LjYzOTc1ZS0wNiAwLjYxNTM5NVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
              class="icon-close-card"
            />
            <ul
              data-v-42ae8b8a
              className="header__option--authen--list"
              style={{ marginTop: "15px" }}
            >
              <li className="header__option--authen-item header__option--authen-item-history">
                <img
                  data-v-42ae8b8a=""
                  src="https://order.thecoffeehouse.com/icon/history-order.svg"
                  alt=""
                  class="icon-user"
                />
                <div data-v-42ae8b8a="" class="history-list-wrap">
                  <a data-v-42ae8b8a="" href="/find-order">
                    <span
                      data-v-42ae8b8a=""
                      class="text-authen"
                      style={{color: "black"}}
                    >
                      Tra cứu đơn hàng
                    </span>
                  </a>
                </div>
                <hr data-v-42ae8b8a=""></hr>
              </li>
              <li
                data-v-42ae8b8a=""
                // data-toggle="modal"
                // data-target="#modalLogin"
                class="header__option--authen-item"
                onClick={() => (window.location.href = "/login")}
                >
                <img
                  data-v-42ae8b8a=""
                  src={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxOCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTNINFYxOEgxNlYySDRWN0gyVjFDMiAwLjczNDc4NCAyLjEwNTM2IDAuNDgwNDMgMi4yOTI4OSAwLjI5Mjg5M0MyLjQ4MDQzIDAuMTA1MzU3IDIuNzM0NzggMCAzIDBIMTdDMTcuMjY1MiAwIDE3LjUxOTYgMC4xMDUzNTcgMTcuNzA3MSAwLjI5Mjg5M0MxNy44OTQ2IDAuNDgwNDMgMTggMC43MzQ3ODQgMTggMVYxOUMxOCAxOS4yNjUyIDE3Ljg5NDYgMTkuNTE5NiAxNy43MDcxIDE5LjcwNzFDMTcuNTE5NiAxOS44OTQ2IDE3LjI2NTIgMjAgMTcgMjBIM0MyLjczNDc4IDIwIDIuNDgwNDMgMTkuODk0NiAyLjI5Mjg5IDE5LjcwNzFDMi4xMDUzNiAxOS41MTk2IDIgMTkuMjY1MiAyIDE5VjEzWk04IDlWNkwxMyAxMEw4IDE0VjExSDBWOUg4WiIgZmlsbD0iI0M0QzRDNCIvPgo8L3N2Zz4K"}
                  alt=""
                  class="icon-user"
                />{" "}
                <span data-v-42ae8b8a="" class="text-authen">
                  Đăng nhập
                </span>{" "}
                <hr data-v-42ae8b8a="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <SearchBox
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          onClose={handleClosePopup}
        />
      )}
    </header>
  );
};

export default HeaderNav;
