import React from 'react'
import { setBookStudentInStorage } from '../services/localStorageHandler';
import dateFormat from 'dateformat';

export const BookStudentListItem = ({bookStudent}) => {
    
    //function to handle click of the list item, sets the BookStudent in local storage
    const handleClick=()=>{
        setBookStudentInStorage(bookStudent);
    }

    return (
        //clickable link to go to BookStudent Details page
    <a href="/bookStudentDetail">
    <div className="card1" onClick={handleClick}>
        <div className="card-body">
            <h3>Book- {bookStudent.book.bookTitle}</h3>
            <h3>Student- {bookStudent.student.studentName}</h3>
            <br/>
            <p>
                {/* Date Format - Sunday, 9 July, 2023 */}
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
