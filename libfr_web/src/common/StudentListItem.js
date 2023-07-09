import React from "react";
import { setStudentInStorage } from "../services/localStorageHandler";

const StudentListItem = ({student}) => {

    //to set the student in storage for the details page
    const handleClick = () => {
        setStudentInStorage(student);
    }

    //clickable list item to navigate to the details page
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