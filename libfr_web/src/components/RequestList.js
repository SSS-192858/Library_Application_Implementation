import React, {useState} from "react";
import { getAllRequests, getRequestByBookCode, getRequestByStudentId } from "../services/request_services";
import { useEffect } from "react";
import RequestListItem from "../common/RequestListItem";
import { getBookFromStorage, getStudentFromStorage } from "../services/localStorageHandler";

const RequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var book = null;
    var student = null;

    const getRequests = async() => {
        if (choice === 1){
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            book = getBookFromStorage();
            const list = await getRequestByBookCode(book.bookCode);
            setRequests(list);
        }else if (choice === 3){
            student = getStudentFromStorage();
            const list = await getRequestByStudentId(student.id);
            setRequests(list);
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
    <>
        { (requests.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
            <h5>Nothing to show</h5>
            </header>
        </div>
            : null
        }
        <div className='container'>
            <div className='row'>
            {requests.map((data) => (
                <div id="space" key= {data.slno}><RequestListItem request={data}/></div>
            ))}
        </div></div>
    </>
    )
}

export default RequestList;