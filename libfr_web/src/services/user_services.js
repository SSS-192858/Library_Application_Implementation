import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:8080/";

//remaining services are defined here 


//to get all books in the library
export const getBooks = async() => {
    const books = await axios.get(API_URL + "books/getAll", { headers: { Authorization: "Bearer " + authHeader() } });
    return books.data;
}

//to get a book using the book code (id)
export const getBookById = async(book_code) => {
    const response = await axios.get(API_URL + "books/getBook/" + book_code, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get a student using the USER id of the student
export const getStudentById = async() => {
    var token = authHeader();
    const response = await axios.get(API_URL + "student/user/getStudent", { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get all the students in the library
export const getStudents = async() => {
    const response = await axios.get(API_URL + `student/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get all the BookStudent records, which represent the books which have been issued to various students
export const getBooksStudents = async() => {
    const response = await axios.get(API_URL + `bookStudent/getAll`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get all the BookStudent records for a particular book
export const getBooksStudentsByBookCode = async(id) => {
    const response = await axios.get(API_URL + `bookStudent/book/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to get all the records for a particular student
export const getBooksStudentsByStudentId = async(id) => {
    var token = authHeader();
    const response = await axios.get(API_URL + `bookStudent/students/${id}`, { headers: { Authorization: "Bearer " + token } });
    return response.data;
}

//to get a particular bookStudent record 
export const getBooksStudentsById = async(id) => {
    const response = await axios.get(API_URL + `bookStudent/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to delete the BookStudent record by the id
export const deleteBookStudent = async(id) => {
    await axios.delete(API_URL + `bookStudent/delete/${id}`, { headers: { Authorization: "Bearer " + authHeader() } });
}

//to save a new book to the library 
export const saveBook = async(bookTitle, bookDesc, author) => {
    var token = authHeader();
    await axios.post(API_URL + "books/save", {
        bookTitle,
        bookDesc,
        author
    }, { headers: { Authorization: "Bearer " + token } });

    return "Book Successfully Saved";
}

//to delete a book from the library, it subsequently deletes all BookStudent records and requests for the book
export const deleteBook = async(bookCode) => {
    var token = authHeader();
    await axios.delete(API_URL + `books/deleteBook/${bookCode}`, { headers: { Authorization: "Bearer " + token } })
    return "Book Successfully Deleted!";
}

//update the details of a book
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

// delete all records of a student - only admin has the authority to do this
export const deleteStudent = async(studentId) => {

    await axios.delete(API_URL + `student/deleteStudent/${studentId}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return "Student Deleted Successfully";
}

// to update details of a student
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