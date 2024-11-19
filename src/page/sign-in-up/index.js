import React, {useState} from "react";
import {useLocalStorage} from "../../util/useLocalStorage";
// import {Col, Container, Row, Form, Button} from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import SignUpForm from "./sign-up";
import SignInForm from "./sign-in";
import {Container} from "react-bootstrap";
import "./sign.css";

const Login  = ()  => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [errorMsg, setErrorMsg] = useState(null);
    // const navigate = useNavigate();
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };
    const containerClass =
        "container " + (type === "signUp" ? "right-panel-active" : "");
    const [jwt,setJwt] = useLocalStorage("","jwt")

    return (
        <>
            {/*<NavBar />*/}
            {/*    <Row className="justify-content-center mt-5">*/}
            {/*        <Col md="8" lg="6">*/}
            {/*            <Form.Group className="mb-3" controlId="username">*/}
            {/*                <Form.Label className="fs-4">Username</Form.Label>*/}
            {/*                <Form.Control*/}
            {/*                    type="email"*/}
            {/*                    size="lg"*/}
            {/*                    placeholder="joe@gmail.com"*/}
            {/*                    value={username}*/}
            {/*                    onChange={(e) => setUsername(e.target.value)}*/}
            {/*                />*/}
            {/*            </Form.Group>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}

            {/*    <Row className="justify-content-center">*/}
            {/*        <Col md="8" lg="6">*/}
            {/*            <Form.Group className="mb-3" controlId="password">*/}
            {/*                <Form.Label className="fs-4">Password</Form.Label>*/}
            {/*                <Form.Control*/}
            {/*                    type="password"*/}
            {/*                    size="lg"*/}
            {/*                    placeholder="Type in your password"*/}
            {/*                    value={password}*/}
            {/*                    onChange={(e) => setPassword(e.target.value)}*/}
            {/*                />*/}
            {/*            </Form.Group>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    {errorMsg ? (*/}
            {/*        <Row className="justify-content-center mb-4">*/}
            {/*            <Col md="8" lg="6">*/}
            {/*                <div className="" style={{ color: "red", fontWeight: "bold" }}>*/}
            {/*                    {errorMsg}*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    ) : (*/}
            {/*        <></>*/}
            {/*    )}*/}
            {/*    <Row className="justify-content-center">*/}
            {/*        <Col*/}
            {/*            md="8"*/}
            {/*            lg="6"*/}
            {/*            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"*/}
            {/*        >*/}
            {/*            <Button*/}
            {/*                id="submit"*/}
            {/*                type="button"*/}
            {/*                size="lg"*/}
            {/*                onClick={() => sendLoginRequest()}*/}
            {/*            >*/}
            {/*                Login*/}
            {/*            </Button>*/}
            {/*            <Button*/}
            {/*                variant="secondary"*/}
            {/*                type="button"*/}
            {/*                size="lg"*/}
            {/*                onClick={() => {*/}
            {/*                    navigate("/");*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Exit*/}
            {/*            </Button>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            <div className="container-Sign">
            <h2>Đăng Ký/Đăng Nhập</h2>
            <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Chào Mừng!</h1>
                            <p>
                            Để duy trì kết nối với chúng tôi vui lòng đăng nhập bằng thông tin cá nhân của bạn!
                            </p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Đăng Ký
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
    )
}

export default Login