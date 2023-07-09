// The following items are stored in local storage, and retrieved, updated or deleted when required.
// 1. Book
// 2. Student
// 3. Request
// 4. BookStudent

//these are stored so that the data to display on screen is not lost in case of a refresh
export const setBookInStorage = (book) => {
    localStorage.setItem("book", JSON.stringify(book));
}

export const getBookFromStorage = () => {
    const book = JSON.parse(localStorage.getItem("book"));
    return book;
}

export const removeBookFromStorage = () => {
    localStorage.removeItem("book");
}

export const setStudentInStorage = (student) => {
    localStorage.setItem("student", JSON.stringify(student));
}

export const getStudentFromStorage = () => {
    const student = JSON.parse(localStorage.getItem("student"));
    return student;
}

export const removeStudentFromStorage = () => {
    localStorage.removeItem("student");
}

export const setRequestInStorage = (request) => {
    localStorage.setItem("request", JSON.stringify(request));
}

export const getRequestFromStorage = () => {
    const request = JSON.parse(localStorage.getItem("request"));
    return request;
}

export const removeRequestFromStorage = () => {
    localStorage.removeItem("request");
}

export const setBookStudentInStorage = (bookStudent) => {
    localStorage.setItem("bookStudent", JSON.stringify(bookStudent));
}

export const getBookStudentFromStorage = () => {
    const bookStudent = JSON.parse(localStorage.getItem("bookStudent"));
    return bookStudent;
}

export const removeBookStudentFromStorage = async() => {
    localStorage.removeItem("bookStudent");
}