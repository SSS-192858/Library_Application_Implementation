import authHeader from "./auth_header";
import axios from "axios";

const API_URL = "http://localhost:8080/";

//request services 

//to get all requests
export const getAllRequests = async () => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+"requests/allRequests", {headers: {Authorization : "Bearer "+token}});
    return responseList.data;
}

//to get all requests for a given student, by student id
export const getRequestByStudentId = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/student/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

//to get all requests for a given book, using book code
export const getRequestByBookCode = async(id) => {
    var token = authHeader();
    const responseList = await axios.get(API_URL+`requests/book/${id}`, {headers: {Authorization: "Bearer "+token}});
    return responseList.data;
}

//to get a request by the request id
export const getRequestById = async (request_id) => {
    const response = await axios.get(API_URL + `requests/${request_id}`, { headers: { Authorization: "Bearer " + authHeader() } });
    return response.data;
}

//to create a new request
export const registerRequest = async(student,book,startDate,endDate)=>{
    await axios.post(API_URL+`requests/save`,{
        student,
        book,
        startDate,
        endDate
    } , {headers:{Authorization:"Bearer "+authHeader()}}
    );

    return "Request Added Successfully";
}

//to delete a request, using the request slno
export const deleteRequest = async(slno) => {
    const response = await axios.delete(API_URL+`requests/delete/${slno}`,{headers:{Authorization:"Bearer "+authHeader()}});
}

//function to accept a request, and make a BookStudent object using it
export const accept = async(request) => {
    const response = await axios.post(API_URL+`bookStudent/accept`,{
        slno : request.slno,
        book : request.book,
        student: request.student,
        startDate: request.startDate,
        endDate: request.endDate
    }, {headers:{Authorization:"Bearer "+authHeader()}});
    return response.data;
}