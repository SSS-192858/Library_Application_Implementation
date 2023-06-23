import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const getUserBoard = () => {
    return axios.get(API_URL + 'dummy_students', { headers: {Authorization : "Bearer "+authHeader()} });
}

export const getAdminBoard = () => {
    return axios.get(API_URL + 'dummy_admin', { headers: {Authorization : "Bearer "+authHeader()} });
}