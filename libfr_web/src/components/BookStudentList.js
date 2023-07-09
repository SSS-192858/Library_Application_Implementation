import React from 'react';
import { useEffect, useState } from 'react';
import { BookStudentListItem } from '../common/BookStudentListItem';
import { getBooksStudents, getBooksStudentsByBookCode, getBooksStudentsByStudentId } from '../services/user_services';
import { getBookFromStorage, getStudentFromStorage } from '../services/localStorageHandler';

//component to show all the book student records
const BookStudentList = ({choice}) => {
  const [bookStudents, setBookStudents] = useState([]);
  var book = null;
  var student = null;

  //choice prop is passed as argument, function called in useEffect
  const getRecords = async () => {
    if (choice === 1){
        //if choice = 1, get all records
        const response = await getBooksStudents();
        setBookStudents(response);
    }else if (choice === 2){
      //if choice = 2, get by student id
        student = getStudentFromStorage();
        const response = await getBooksStudentsByStudentId(student.id);
        setBookStudents(response);
    }else if (choice === 3){
      //if choice = 3, get by book code
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
    {/* if empty, show nothing to show, else show the records */}
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