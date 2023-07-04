import React from 'react'
import { setBookStudentInStorage } from '../services/localStorageHandler';

export const BookStudentListItem = ({bookStudent}) => {
  
    const handleClick=()=>{
        setBookStudentInStorage(bookStudent);
    }

    return (

    <a href="/bookStudentDetail">
    <div className="card1" onClick={handleClick}>
        <div className="card-body">
            <h3>{bookStudent.book.bookTitle}</h3>
            <h3>{bookStudent.student.studentName}</h3>
            <br/>
            <p>
                From - {bookStudent.startDate}
            </p>
            <p>
                To - {bookStudent.endDate}
            </p>
        </div>
    </div>
    </a>
  )
}
