import React, {useEffect} from "react";
import { logout } from "../api/auth_services";

const LogoutScreen = () => {
    const AppLogout = () => {
        logout();
    }

    useEffect(() => {
        AppLogout();
    },[])
}

export default LogoutScreen;