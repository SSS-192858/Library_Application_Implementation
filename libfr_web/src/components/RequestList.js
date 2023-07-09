import React, {useState} from "react";
import { getAllRequests, getRequestByBookCode, getRequestByStudentId } from "../services/request_services";
import { useEffect } from "react";
import RequestListItem from "../common/RequestListItem";
import { getBookFromStorage, getStudentFromStorage } from "../services/localStorageHandler";

//component to show all pending requests 
const RequestList = ({choice}) => {
    const [requests, setRequests] = useState([]);
    var book = null;
    var student = null;

    //choice is passed as prop
    const getRequests = async() => {
        if (choice === 1){
            //if choice = 1, get all requests
            const list = await getAllRequests();
            setRequests(list);
        }else if (choice === 2){
            //if choice = 2, get by book code
            book = getBookFromStorage();
            const list = await getRequestByBookCode(book.bookCode);
            setRequests(list);
        }else if (choice === 3){
            //if choice = 3, get by student id
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
    {/* if request list is empty, show banner saying nothing to show, else show the list */}
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
                <div id="space" key= {data.slno} className="col-lg-4 col-sm-12 col-md-6"><RequestListItem request={data}/></div>
            ))}
        </div></div>
    </>
    )
}

export default RequestList;