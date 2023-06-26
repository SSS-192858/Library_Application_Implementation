import React, {useState, useEffect} from 'react'
import { getStudents } from '../services/user_services';
import StudentListItem from '../common/StudentListItem';

function StudentList({setStudent}){

    const [students, setStudents] = useState([]);

  const getstudentsComp = async () => {
    const response = await getStudents();
    console.log(response)
    setStudents(response);
  }

  useEffect(() => {
    getstudentsComp();
  },[])
  
  return (
    <ul id="remove">
      {students.map((data) => (
        <li id="space" key= {data.id}><StudentListItem student={data} setStudent={setStudent}/></li>
      ))}
    </ul>
  );
}

export default StudentList;