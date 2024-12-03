import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {useLocalStorage} from "../../util/useLocalStorage";
// import "./sign.module.css";

function SignInForm() {
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = React.useState("");
    const [jwt,setJwt] = useLocalStorage("","jwt")
    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        sendLoginRequest();
    };

    const sendLoginRequest = () => {
        setErrorMsg("");
        const { email, password } = state; // Extract email and password from state

        const reqBody = {
            username: email,  // Map email to username field
            password: password
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers]);
                } else {
                    setErrorMsg(
                        "Something went wrong, try again later or reach out to support."
                    );
                    throw new Error("Login failed");
                }
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "/dashboard";
            })
            .catch((message) => {
                alert(message);
            });
    };


    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Đăng Nhập</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social">
                        <FontAwesomeIcon icon={faGooglePlusG} />
                    </a>
                    <a href="#" className="social">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </div>
                <span>Hoặc sử dụng tài khoản</span>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật Khẩu"
                    value={state.password}
                    onChange={handleChange}
                />
                <a href="#">Quên Mật Khẩu?</a>
                <button>Đăng Nhập</button>
                {errorMsg && <p className="error">{errorMsg}</p>}
                
            </form>
        </div>
    );
}

export default SignInForm;
