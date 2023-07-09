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
    return books.data;
}

export const getBookById = async(book_code) => {
    const response = await axios.get(API_URL + "books/getBook/" + book_code, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getStudentById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "student/user/getStudent", { headers: { Authorization: "Bearer " + token }});
    return response.data;
}

export const getStudents = async() => {
    const response = await axios.get(API_URL + `student/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getBooksStudents = async() => {
    const response = await axios.get(API_URL + `bookStudent/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

export const getBooksStudentsByBookCode = async (id) => {
    const response = await axios.get(API_URL + `bookStudent/book/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
    return response.data;
}

export const getBooksStudentsByStudentId = async (id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `bookStudent/students/${id}`, {headers: {Authorization: "Bearer "+token}});
    return response.data;
}

export const getBooksStudentsById = async (id) => {
    const response = await axios.get(API_URL + `bookStudent/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
    return response.data;
}

export const deleteBookStudent = async (id) => {
    await axios.delete(API_URL + `bookStudent/delete/${id}`, {headers: {Authorization: "Bearer "+authHeader()}});
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

