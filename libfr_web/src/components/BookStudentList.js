import React from 'react';
import { useEffect, useState } from 'react';
import { BookStudentListItem } from '../common/BookStudentListItem';
import { getBooksStudents, getBooksStudentsByBookCode, getBooksStudentsByStudentId } from '../services/user_services';
import { getBookFromStorage, getStudentFromStorage } from '../services/localStorageHandler';

const BookStudentList = ({choice}) => {
  const [bookStudents, setBookStudents] = useState([]);
  var book = null;
  var student = null;

  const getRecords = async () => {
    if (choice === 1){
        const response = await getBooksStudents();
        setBookStudents(response);
    }else if (choice === 2){
        student = getStudentFromStorage();
        console.log(student)
        const response = await getBooksStudentsByStudentId(student.id);
        setBookStudents(response);
    }else if (choice === 3){
        book = getBookFromStorage();
        const response = await getBooksStudentsByBookCode(book.bookCode);
        setBookStudents(response);
    }
  }

  useEffect(() => {
    getRecords();
  },[])
    
  return (
    <>
      { (bookStudents.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
                <h5>Nothing to show</h5>
            </header>
        </div>
            : null
      }
      <div className='container'>
        <div className='row'>
        {bookStudents.map((data) => (
          <div id="space" key= {data.slno} className='col-lg-4 col-sm-12 col-md-6'><BookStudentListItem bookStudent={data}/></div>
        ))}
      </div></div>
    </>
  );
}

export default BookStudentList;