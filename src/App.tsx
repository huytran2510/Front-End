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
import ShoppingCart from "./page/product/ShoppingCart";
import SearchBox from './page/product/SearchBox';
import Payment from './payment/Payment';
import {AddressProvider} from './context/AddressContext';
import FindOrder from './page/order/FindOrder';
import CoffeeHatRang from './page/product/CoffeeHatRang';
import SuccessPage from "./payment/SuccessPage";
import useDataProvider from './data/dataProvider';
import { Admin, Resource } from "react-admin";
import { listProducts, editProduct, createProduct } from "./page/admin/products";

function App() {
    const [jwt, setJwt] = useLocalStorage("", "jwt")

    const dataProvider = useDataProvider(jwt);
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
                <Route path={"/home"} element={<Homepage/>}/>
                <Route path={"/chat"} element={<ChatRoom/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/find-order" element={<FindOrder/>}/>
                <Route path="/coffee" element={<CoffeeHatRang/>}/>
                <Route path="/success" element={<SuccessPage/>}/>
                <Route
                path="/admin/*"
                element={
                        <PrivateRoute>
                            <Admin dataProvider={dataProvider}>
                            <Resource
                                name="products"
                                list={listProducts}
                                edit={editProduct}
                                create={createProduct}
                            />
                            </Admin>
                        </PrivateRoute>
                    }
            />
            </Routes>
            
        </>

    );
}

export default App;
