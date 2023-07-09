import React, {useState, useEffect} from 'react'
import { getStudents } from '../services/user_services';
import StudentListItem from '../common/StudentListItem';

//function to show the list of students registered with the library
function StudentList(){

  const [students, setStudents] = useState([]);

  //students are fetched from the backend
  const getstudentsComp = async () => {
    const response = await getStudents();
    setStudents(response);
  }

  useEffect(() => {
    getstudentsComp();
  },[])
  
  return (
    <>
    {/* if no students, show banner saying nothing to show, else show the list of students */}
      { (students.length === 0) ? <div className='container banner'>
              <header className='jumbotron banner'> 
              <h5>Nothing to show</h5>
              </header>
          </div>
              : null
      }
      <div className='container'>
        <div className='row'>
          {students.map((data) => (
            <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><StudentListItem student={data}/></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StudentList;