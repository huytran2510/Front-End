import React, {useEffect} from 'react';
import './App.css';
import {useLocalStorage} from "./util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./page/dashboard";
import Homepage from "./page/homepage/HomePage";
import Login from "./page/sign-in-up";
import PrivateRoute from "./page/privateRoute";
import AssignmentView from "./page/AssignmentView";
import Header from "./page/header/Header";
import Footer from "./page/footer/Footer";
import ChatRoom from "./page/chat/ChatRoom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./page/menu/Menu";
import ProductDetail from "./page/product/ProductDetail";

function App() {
    const [jwt,setJwt] = useLocalStorage("","jwt")
    // useEffect(() => {
    //         // const reqBody = {
    //         //     "username": "test1",
    //         //     "password": "test1"
    //         // }
    //         // fetch("api/auth/login", {
    //         //     headers: {
    //         //         "Content-Type": "application/json"
    //         //     },
    //         //     method: "post",
    //         //     body: JSON.stringify(reqBody)
    //         // })
    //         //     .then((response) => Promise.all([response.json(), response.headers]))
    //         //     .then(([body, headers]) => {
    //         //         // @ts-ignore
    //         //         setJwt(headers.get("authorization"));
    //         //     });
    // },[])
    return (
        <>
            <Routes>
            <Route path="/dashboard" element={<PrivateRoute>
                <Dashboard/>
            </PrivateRoute>}/>
            <Route
                path={"/assignments/:id"}
                element={<PrivateRoute>
                    <AssignmentView/>
                </PrivateRoute>}/>
            <Route path="/" element={<Homepage/>}/>
            <Route path={"/login"} element={<Login/>}/>
                <Route path={"/home"} element={<Homepage/>} />
                <Route path={"/chat"} element={<ChatRoom/>} />
            <Route path="/menu" element={<Menu/>} />
                <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        </>

    );
}

export default App;
