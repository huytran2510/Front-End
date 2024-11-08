import React from "react";
import {useLocalStorage} from "../../util/useLocalStorage";
import {Navigate} from "react-router-dom";
import ajax from "../../ajax/fetchService";

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useLocalStorage("", "jwt")
    if (jwt) {
        ajax(`/api/auth/validate?token=${jwt}`, jwt, "GET", null).then(isValid => {
            return isValid === true ? children : <Navigate to={"/login"}/>
        })
    } else {
        return <Navigate to={"/login"}/>
    }
    return jwt ? children : <Navigate to={"/login"}/>
}

export default PrivateRoute