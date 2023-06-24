import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const login = async(username, password) => {
    const response = await axios
        .post(API_URL + "authenticate", {
            username,
            password
        });
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const registerAdmin = async(username, password) => {

    await axios.post(API_URL + "register_admin", {
        username,
        password
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Admin added successfully";
};

export const registerStudent = async(username, password, studentName, email, phone) => {
    const response = await axios.post(API_URL + "register_student", {
        username,
        password
    });

    var token = "";

    if (response.data.token) {
        token = response.data.token;
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    await axios.post(API_URL + "student/save", {
        studentName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Signup successful";
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}