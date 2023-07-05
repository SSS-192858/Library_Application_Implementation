import React from 'react'
import { setBookStudentInStorage } from '../services/localStorageHandler';
import dateFormat from 'dateformat';

export const BookStudentListItem = ({bookStudent}) => {
  
    const handleClick=()=>{
        setBookStudentInStorage(bookStudent);
    }

    return (

    <a href="/bookStudentDetail">
    <div className="card1" onClick={handleClick}>
        <div className="card-body">
            <h3>Book- {bookStudent.book.bookTitle}</h3>
            <h3>Student- {bookStudent.student.studentName}</h3>
            <br/>
            <p>
                From - {dateFormat(bookStudent.startDate, "fullDate")}
            </p>
            <p>
                To - {dateFormat(bookStudent.endDate, "fullDate")}
            </p>
        </div>
    </div>
    </a>
  )
}
