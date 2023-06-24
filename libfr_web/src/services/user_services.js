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

export const getBookById = async (book_code) => {
    const response = await axios.get(API_URL + "books/getBook/" + book_code, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}