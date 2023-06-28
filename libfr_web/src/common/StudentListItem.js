import React from "react";
import { Link } from "react-router-dom";
import { setStudentInStorage } from "../services/localStorageHandler";

const StudentListItem = ({student}) => {

    const handleClick = () => {
        setStudentInStorage(student);
    }

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/studentDetail">
                <p>{student.id}</p>
                <p>{student.studentName}</p>
                <p>{student.email}</p>
                <p>{student.phone}</p>
            </Link>
        </div>
    )
}

export default StudentListItem;