import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

export const getUserBoard = () => {
    return axios.get(API_URL + 'dummy_students', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getAdminBoard = () => {
    return axios.get(API_URL + 'dummy_admin', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getBooks = async() => {
    const books = await axios.get(API_URL + "books/getAll", { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(books.data);
    return books.data;
}

export const getBookById = async(book_code) => {
    const response = await axios.get(API_URL + "books/getBook/" + book_code, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getStudentById = async() => {
    var token = authHeader();
    console.log(token);
    const response = await axios.get(API_URL + "student/user/getStudent", { headers: { Authorization: "Bearer " + token }});
    console.log(response.data)
    return response.data;
}

export const getStudents = async() => {
    const response = await axios.get(API_URL + `student/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getBooksStudents = async() => {
    const response = await axios.get(API_URL + `bookStudent/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}

export const getBooksStudentsByBookCode = async (id) => {
    const response = await axios.get(API_URL + `bookStudent/book/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
    return response.data;
}

export const getBooksStudentsByStudentId = async (id) => {
    console.log(id);
    const response = await axios.get(API_URL + `bookStudent/student/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
    console.log(response.data)
    return response.data;
}

export const getBooksStudentsById = async (id) => {
    const response = await axios.get(API_URL + `bookStudent/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
    return response.data;
}

export const deleteBookStudent = async (id) => {
    await axios.delete(API_URL + `bookStudent/delete/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
}