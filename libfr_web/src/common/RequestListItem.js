import React from "react";
import { Link } from "react-router-dom";

const RequestListItem = ({request, setRequest}) => {

    const handleClick = () => {
        setRequest(request);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/requestDetails">
                <p>
                    Book Details :
                </p>
                <p>{request.book.bookCode}</p>
                <p>{request.book.bookTitle}</p>
                <p>{request.book.author}</p>
                <p>{request.book.bookDesc}</p>

                <p>
                    Student Details :
                </p>

                <p>{request.student.id}</p>
                <p>{request.student.studentName}</p>

                <p>
                    Start Date : {request.startDate}
                </p>
                <p>
                    End Date : {request.endDate}
                </p>
            </Link>
        </div>
    )
}

export default RequestListItem;