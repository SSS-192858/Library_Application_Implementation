import React from 'react';
import { useEffect, useState } from 'react';
import { BookStudentListItem } from '../common/BookStudentListItem';
import { getBooksStudents, getBooksStudentsByBookCode, getBooksStudentsByStudentId } from '../services/user_services';

function BookStudentList({setBookStudent, choice, id}) {
  const [bookStudents, setBookStudents] = useState([]);

  useEffect(() => {
    const getRecords = async () => {
      if (choice === 1){
          const response = await getBooksStudents();
          setBookStudents(response);
      }else if (choice === 2){
          const response = await getBooksStudentsByStudentId(id.id);
          console.log(response)
          setBookStudents(response);
      }else if (choice === 3){
          const response = await getBooksStudentsByBookCode(id.bookCode);
          setBookStudents(response);
      }
    }
    getRecords();
  },[choice, id])
    
  return (
    <ul id="remove">
      {bookStudents.map((data) => (
        <li id="space" key= {data.slno}><BookStudentListItem bookStudent={data} setBookStudent={setBookStudent}/></li>
      ))}
    </ul>
  );
}

export default BookStudentList;