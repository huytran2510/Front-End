import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function SignUpForm() {
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { name, email, password } = state;
        alert(
            `You are sign up with name: ${name} email: ${email} and password: ${password}`
        );

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Tạo Tài Khoản</h1>
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
                <span>Hoặc sử dụng email để tạo tài khoản</span>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Họ Và Tên"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Mật Khẩu"
                />
                <button>Đăng Ký</button>
            </form>
        </div>
    );
}

export default SignUpForm;
