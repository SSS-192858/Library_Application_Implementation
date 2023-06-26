import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const StudentListItem = ({student, setStudent}) => {

    const handleClick = () => {
        setStudent(student);
    }

    useEffect(() => {
        console.log(student)
    })

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