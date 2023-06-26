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

export const saveBook = async(bookTitle, bookDesc, author) => {
    var token = authHeader();
    await axios.post(API_URL + "books/save", {
        bookTitle,
        bookDesc,
        author
    }, { headers: { Authorization: "Bearer " + token } });

    return "Book Successfully Saved";
}

export const deleteBook = async(bookCode) => {
    var token = authHeader();
    await axios.delete(API_URL + `books/deleteBook/${bookCode}`, { headers: { Authorization: "Bearer " + token } })
    return "Book Successfully Deleted!";
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const updateBook = async(bookCode, bookTitle, bookDesc, author) => {
    var token = authHeader();

    await axios.put(API_URL + "books/updateBook", {
        bookCode,
        bookTitle,
        author,
        bookDesc
    }, { headers: { Authorization: "Bearer " + token } });

    return "Book Data updated successfully";
}

export const deleteStudent = async(studentId) => {

    await axios.delete(API_URL + `student/deleteStudent/${studentId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Student Deleted Successfully";
}

export const updateStudent = async(id, studentName, email, phone) => {
    var token = authHeader();

    await axios.put(API_URL + "student/updateStudent", {
        id,
        studentName,
        email,
        phone
    }, { headers: { Authorization: "Bearer " + token } });

    return "Data saved successfully";
}