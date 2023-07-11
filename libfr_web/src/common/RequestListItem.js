import React from "react";
import { setRequestInStorage } from "../services/localStorageHandler";
import dateFormat from "dateformat";
import {Link} from 'react-router-dom'
const RequestListItem = ({request}) => {

    //functioning similar to the BookStudentListItem
    const handleClick = () => {
        setRequestInStorage(request);
    }

    return (
        <Link to={"/requestDetails"}>
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h3>Book- {request.book.bookTitle}</h3>
                    <h3>Student- {request.student.studentName}</h3>
                    <br/>
                    <p>
                        From - {dateFormat(request.startDate, "fullDate")}
                    </p>
                    <p>
                        To - {dateFormat(request.endDate, "fullDate")}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default RequestListItem;