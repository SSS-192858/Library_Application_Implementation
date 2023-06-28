import React from 'react'
import { Link } from "react-router-dom";

export const BookStudentListItem = ({bookStudent,setBookStudent}) => {
  

    const handleClick=()=>{
        setBookStudent(bookStudent);
    }

    return (
    <div className="book" onClick={handleClick}>
    <Link to="/bookStudentDetail">
        <p>
            Book Details :
        </p>
        <p>{bookStudent.book.bookCode}</p>
        <p>{bookStudent.book.bookTitle}</p>
        <p>{bookStudent.book.author}</p>
        <p>{bookStudent.book.bookDesc}</p>

        <p>
            Student Details :
        </p>

        <p>{bookStudent.student.id}</p>
        <p>{bookStudent.student.studentName}</p>

        <p>
            Start Date : {bookStudent.startDate}
        </p>
        <p>
            End Date : {bookStudent.endDate}
        </p>
    </Link>
</div>
  )
}