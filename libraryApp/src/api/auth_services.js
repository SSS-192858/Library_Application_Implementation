import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./createApi";

export const login = async(username, password) => {
    const response = await api
        .post("/authenticate", {
            username,
            password
        });
    if (response.data.token) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = async () => {
    await AsyncStorage.removeItem("user");
};

export const registerAdmin = async(username, password) => {

    await api.post("/register_admin", {
        username,
        password
    }, { headers: { Authorization: "Bearer " + authHeader() } });

    return "Admin added successfully";
};

export const registerStudent = async(username, password, studentName, email, phone) => {
    const response = await api.post("/register_student", {
        username,
        password
    });

    var token = "";

    if (response.data.token) {
        token = response.data.token;
    }

    await api.post("/student/save", {
        studentName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Signup successful";
}

export const getCurrentUser = async () => {
    const str = await AsyncStorage.getItem('user');
    if (str){
        return JSON.parse(str);
    }
}