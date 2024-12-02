import React, { useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CustomPaging from "../slider/CustomPaging";
import "../../css/product_detail.css";
import { useState } from "react";
import ajax from "../../ajax/fetchService";
import { useParams } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import Add from "../../asset/add.png";
import Minus from "../../asset/minus.png";
import ProductReviews from "./ProductReviews";
import FocusOnSelect from "../slider/FocusOnSelect";
import HeaderNav from "../header/HeaderNav";

const ProductDetail = () => {
  const [activeSize, setActiveSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const [toppingPrice, setToppingPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [productCategory, setProductCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const { id } = useParams();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [imageCategory, setImageCategory] = useState([]);
  const handleClick = (size) => {
    setActiveSize(size);
    switch (size) {
      case "Nhỏ":
        setSizePrice(0); // Giá cơ bản
        break;
      case "Vừa":
        setSizePrice(6000); // Giá cơ bản + 6000
        break;
      case "Lớn":
        setSizePrice(16000); // Giá cơ bản + 12000
        break;
      default:
        setSizePrice(0); // Trường hợp không chọn gì
        break;
    }
    console.log(activeSize)
  };

  const handleCheckboxChange = (event) => {
    const { id, checked, value } = event.target;
    const toppingPrice = parseInt(value, 10); // Giá của topping

    setSelectedToppings((prevToppings) => {
      const updatedToppings = checked
        ? [...prevToppings, id] // Thêm topping
        : prevToppings.filter((topping) => topping !== id); // Xóa topping

      console.log("Selected toppings:", updatedToppings); // In danh sách cập nhật
      return updatedToppings;
    });

    setToppingPrice((prevToppingPrice) => {
      const updatedPrice = checked
        ? prevToppingPrice + toppingPrice // Cộng giá
        : prevToppingPrice - toppingPrice; // Trừ giá

      console.log("Topping price:", updatedPrice); // In giá cập nhật
      return updatedPrice;
    });
  };


  useEffect(() => {
    setTotalPrice(sizePrice + toppingPrice);
  }, [sizePrice, toppingPrice]);

  const [urlImages, setUrlImages] = useState([]);
  useEffect(() => {
    if (id) {
      ajax(`/products/${id}`, "", "GET", "")
        .then((product) => {
          setProduct(product);
          setLoading(false);
          setUrlImages(product.urlImage); // Correctly updating the state
          console.log("product:", product);
          setCategoryId(product.categoryId);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
      console.log("product category:", categoryId);
    }
  }, [id]);

  useEffect(() => {
    if (categoryId) {
      ajax(`/products/category/${categoryId}`, "", "GET", "")
        .then((productCategory) => {
          setProductCategory(productCategory);
          setImageCategory(productCategory.urlImage); // Correctly updating the state
          console.log("product category:", productCategory);
          console.log("image category:", imageCategory);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        });
    }
  }, [categoryId]);


  let autoIncrementId = parseInt(localStorage.getItem("autoIncrementId")) || 1;
  const addToCart = () => {
    const item = {
      id: autoIncrementId++, // Tự động tăng id
      productId: product.productId, // id sản phẩm riêng biệt
      name: product.productName,
      price: product.unitPrice,
      quantity: quantity,
      urlImage: product.urlImage,
      toppings: selectedToppings,
      size: activeSize,
      totalPrice: (product.unitPrice + selectedToppings.length * 10000 + sizePrice),
    };

    localStorage.setItem("autoIncrementId", autoIncrementId);


    console.log("price", item.totalPrice);
    console.log("size", activeSize)

    // Lấy giỏ hàng hiện tại từ session storage
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa (so sánh cả size và toppings)
    const index = existingCart.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId &&
        cartItem.size === item.size &&
        JSON.stringify(cartItem.toppings.sort()) === JSON.stringify(item.toppings.sort())
    );

    if (index > -1) {
      // Nếu đã có sản phẩm cùng size và toppings, tăng số lượng
      existingCart[index].quantity += item.quantity;
      existingCart[index].totalPrice =
        (existingCart[index].price + selectedToppings.length * 10000 + getSizePrice(activeSize)) *
        existingCart[index].quantity;
    } else {
      // Nếu chưa, thêm sản phẩm mới
      existingCart.push(item);
    }

    // Lưu lại giỏ hàng vào session storage
    sessionStorage.setItem("cart", JSON.stringify(existingCart));

    // Cập nhật trạng thái cartItems
    setCartItems(existingCart);

    // redirect to cart
    window.location.href = "/cart";

    console.log("Added to cart", existingCart);
  };


  // Hàm tính giá size
  const getSizePrice = (size) => {
    switch (size) {
      case "vừa":
        return 6000;
      case "lớn":
        return 16000;
      default:
        return 0; // Nhỏ
    }
  };


  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Không giảm dưới 0
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Bỏ số thập phân
    }).format(value);
  }

  return (
    <>
      <HeaderNav />
      <div className={"product_info"}>
        <div className={"container product_wrap product_info_r"}>
          <div className={"col-md-6 col-lg-6"}>
            <div className="">
              <CustomPaging urlImages={urlImages} />
            </div>
          </div>
          <div className={"col-md-6 col-lg-6"}>
            <div className="m-4">
              <div class="inforr_product container">
                <div style={{}}>
                  <h2 class="info_product_title">{product.productName}</h2>
                  <div class="info_product_price">
                    <span class="price">
                      {formatCurrency(product.unitPrice + totalPrice)}
                    </span>
                    {/* <del class="price_original hide">0 đ</del>
                    <span class="sale_percent hide">Giảm 0 %</span> */}
                  </div>
                </div>
              </div>

              <div class="option_sizes">
                <p class="option_title">Chọn size (bắt buộc)</p>
                <div class="product_options">
                  <div id="ax_1051215256" class="opt_size">
                    <div
                      data-filter="Nhỏ"
                      data-barcode="10010239"
                      data-sku="651a3e4446f8d80012962e1e"
                      className={`product__info__item__list__item icons_0 ${
                        activeSize === "Nhỏ" ? "active" : ""
                      }`}
                      onClick={() => handleClick("Nhỏ")}
                    >
                      <svg
                        viewBox="0 0 13 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          class="shape "
                          d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                        ></path>{" "}
                      </svg>
                      <div class="circle">Nhỏ + 0 đ</div>
                    </div>
                    <div
                      data-filter="Vừa"
                      data-barcode="10010240"
                      data-sku="651a3e4446f8d80012962e1e"
                      className={`product__info__item__list__item icons_1 ${
                        activeSize === "Vừa" ? "active" : ""
                      }`}
                      onClick={() => handleClick("Vừa")}
                    >
                      <svg
                        viewBox="0 0 13 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          class="shape "
                          d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                        ></path>{" "}
                      </svg>
                      <div class="circle">Vừa + 6.000 đ</div>
                    </div>
                    <div
                      data-filter="Lớn"
                      data-barcode="10010241"
                      data-sku="651a3e4446f8d80012962e1e"
                      className={`product__info__item__list__item icons_2 ${
                        activeSize === "Lớn" ? "active" : ""
                      }`}
                      onClick={() => handleClick("Lớn")}
                    >
                      <svg
                        viewBox="0 0 13 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          class="shape "
                          d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                        ></path>{" "}
                      </svg>
                      <div class="circle">Lớn + 16.000 đ</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="option_topping">
                <p class="option_title">Topping</p>
                <div class="product_options">
                  <label class="option_item">
                    <input
                      type="checkbox"
                      class="checkbox"
                      id="Sốt Caramel"
                      tid="prolang"
                      name="topping_tch"
                      title="Sốt Caramel"
                      alt="10100019"
                      value="10000"
                      onChange={handleCheckboxChange}
                    />
                    <div class="option_inner tch_top">
                      <div class="name">Sốt Caramel + 10.000 đ</div>
                    </div>
                  </label>
                  <label class="option_item">
                    <input
                      type="checkbox"
                      class="checkbox"
                      id="Shot Espresso"
                      tid="prolang"
                      name="topping_tch"
                      title="Shot Espresso"
                      alt="10100003"
                      value="10000"
                      onChange={handleCheckboxChange}
                    />
                    <div class="option_inner tch_top">
                      <div class="name">Shot Espresso + 10.000 đ</div>
                    </div>
                  </label>
                  <label class="option_item">
                    <input
                      type="checkbox"
                      class="checkbox"
                      id="Trân châu trắng"
                      tid="prolang"
                      name="topping_tch"
                      title="Trân châu trắng"
                      alt="10100016"
                      value="10000"
                      onChange={handleCheckboxChange}
                    />
                    <div class="option_inner tch_top">
                      <div class="name">Trân châu trắng + 10.000 đ</div>
                    </div>
                  </label>
                </div>
              </div>
              <h7>Số Lượng</h7>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{
                    color: "black",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  style={{
                    width: "100px",
                    height: "100%",
                    textAlign: "center",
                    border: "2px solid #f0f0f0",
                    appearance: "textfield",
                  }}
                  min="0"
                />
                <button
                  style={{
                    color: "black",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <div class="product_to_cart">
                <ul class="order_method">
                  <li
                    class="x1"
                    style={{ backgroundColor: "rgb(229, 121, 5)" }}
                  >
                    <button
                      target="_blank"
                      style={{ backgroundColor: "#E57905" }}
                      href=""
                      onClick={addToCart}
                    >
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 0C14.5523 0 15 0.447715 15 1V1.999L20 2V8L17.98 7.999L20.7467 15.5953C20.9105 16.032 21 16.5051 21 16.999C21 19.2082 19.2091 20.999 17 20.999C15.1368 20.999 13.5711 19.7251 13.1265 18.0008L8.87379 18.0008C8.42948 19.7256 6.86357 21 5 21C3.05513 21 1.43445 19.612 1.07453 17.7725C0.435576 17.439 0 16.7704 0 16V3C0 2.44772 0.447715 2 1 2H8C8.55228 2 9 2.44772 9 3V11C9 11.5128 9.38604 11.9355 9.88338 11.9933L10 12H12C12.5128 12 12.9355 11.614 12.9933 11.1166L13 11V2H10V0H14ZM5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15ZM17 14.999C15.8954 14.999 15 15.8944 15 16.999C15 18.1036 15.8954 18.999 17 18.999C18.1046 18.999 19 18.1036 19 16.999C19 15.8944 18.1046 14.999 17 14.999ZM15.852 7.999H15V11C15 12.6569 13.6569 14 12 14H10C8.69412 14 7.58312 13.1656 7.17102 12.0009L1.99994 12V14.3542C2.73289 13.5238 3.80528 13 5 13C6.86393 13 8.43009 14.2749 8.87405 16.0003H13.1257C13.5693 14.2744 15.1357 12.999 17 12.999C17.2373 12.999 17.4697 13.0197 17.6957 13.0593L15.852 7.999ZM7 7H2V10H7V7ZM18 4H15V6H18V4ZM7 4H2V5H7V4Z"
                          fill="white"
                          fill-opacity="0.6"
                        ></path>
                      </svg>
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 product_content_bottom">
            <hr class="hidden-xs" />
            <div>
              <h4 class="related_product_title">Mô tả sản phẩm</h4>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="product_content_bottom">
            <h4 class="related_product_title">Sản phẩm liên quan</h4>
            <FocusOnSelect images={productCategory} />
          </div>
        </div>
      </div>

      <ProductReviews productId={product.productId} />

      <Footer />
    </>
  );
};

export default ProductDetail;
