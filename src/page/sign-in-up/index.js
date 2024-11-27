import React, { useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
// import {Col, Container, Row, Form, Button} from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import SignUpForm from "./sign-up";
import SignInForm from "./sign-in";
import { Container } from "react-bootstrap";
import "./sign.css";

const Login = () => {
  // const [errorMsg, setErrorMsg] = useState(null);
  // const navigate = useNavigate();
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  return (
    <>
      <div className="container-Sign">
        <div className={containerClass} id="container">
          <SignUpForm />
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Chào Mừng!</h1>
                <p>
                  Để duy trì kết nối với chúng tôi vui lòng đăng nhập bằng thông
                  tin cá nhân của bạn!
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => handleOnClick("signIn")}
                >
                  Đăng Nhập
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Chào Bạn!</h1>
                <p>Nếu bạn chưa có tài khoản chọn đăng ký!</p>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => handleOnClick("signUp")}
                >
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
