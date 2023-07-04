import React from "react";
import { setStudentInStorage } from "../services/localStorageHandler";

const StudentListItem = ({student}) => {

    const handleClick = () => {
        setStudentInStorage(student);
    }

    return (
        <a href="/studentDetail">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h1>{student.studentName}</h1>
                    <br />
                    <h6>Email- {student.email}</h6>
                    <h6>Phone- {student.phone}</h6>
                </div>
            </div>
        </a>
    )
}

export default StudentListItem;