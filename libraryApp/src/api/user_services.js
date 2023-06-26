import api from "./createApi";
import authHeader from "./auth-header";

export const getUserBoard = () => {
    return api.get('/dummy_students', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getAdminBoard = () => {
    return api.get('/dummy_admin', { headers: { Authorization: "Bearer " + authHeader() } });
}

export const getBooks = async() => {
    const books = await api.get("/books/getAll", { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(books.data);
    return books.data;
}

export const getBookById = async (book_code) => {
    const response = await axios.get("/books/getBook/" + book_code, { headers: { Authorization: "Bearer " + authHeader() } });
    console.log(response.data)
    return response.data;
}