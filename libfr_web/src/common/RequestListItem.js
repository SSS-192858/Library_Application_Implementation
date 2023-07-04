import React from "react";
import { setRequestInStorage } from "../services/localStorageHandler";

const RequestListItem = ({request}) => {

    const handleClick = () => {
        setRequestInStorage(request);
    }

    return (
        <a href="/requestDetails">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h3>Book- {request.book.bookTitle}</h3>
                    <h3>Student- {request.student.studentName}</h3>
                    <br/>
                    <p>
                        From - {request.startDate}
                    </p>
                    <p>
                        To - {request.endDate}
                    </p>
                </div>
            </div>
        </a>
    )
}

export default RequestListItem;