import axios from "axios";
import authHeader from "./auth_header";

//the backend runs on port 8080, hence we make requests to this port.
const API_URL = "http://localhost:8080/";


//function to login
export const login = async(username, password) => {
    const response = await axios
        .post(API_URL + "authenticate", {
            username,
            password
        });
    //response contains user object and jwt token
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//logout removes token
export const logout = () => {
    localStorage.removeItem("user");
};


//function to register a new admin account, it requires only username and password
export const registerAdmin = async(username, password) => {

    await axios.post(API_URL + "register_admin", {
        username,
        password
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Admin added successfully";
};

//function to add student in database, it creates the user as well as the student record
export const registerStudent = async(username, password, studentName, email, phone) => {
    const response = await axios.post(API_URL + "register_student", {
        username,
        password
    });

    //get temporary token and use it to store the details of the student

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

//to fetch user from local storage
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}
