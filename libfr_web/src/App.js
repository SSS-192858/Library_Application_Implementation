import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
import SignupStudent from "./components/SignupStudent";
import SignupAdmin from "./components/SignupAdmin";
import BooksList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import BookSaveForm from "./components/BookSaveForm";
import BookUpdateForm from "./components/BookUpdate";
import UpdateStudent from "./components/StudentUpdateForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import RequestList from "./components/RequestList";
import BookStudentList from "./components/BookStudentList";
import BookRequestForm from "./components/BookRequestForm";
import RequestDetails from "./components/RequestDetails";
import BookStudentDetails from "./components/BookStudentDetails"
import { removeBookFromStorage, removeBookStudentFromStorage, removeRequestFromStorage, removeStudentFromStorage } from "./services/localStorageHandler";

function App() {

  // isAdmin variable used to check if the current user logged in is Admin .
  // Using UseState function to get the current user from local storage.
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = getCurrentUser();
    if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "ADMIN"){
      return true;
    }else{
      return false;
    }
  });

  // isStudent variable used to check if the current user logged in is Student .
  // Using UseState function to get the current user from local storage.
  const [isStudent, setIsStudent] = useState(() => {
    const user = getCurrentUser();
    if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "STUDENT"){
      return true;
    }else{
      return false;
    }
  });

  // currentUser variable that is used to set the current user who is logged in. This also
  // takes the current user with the help of local storage.
  const [currentUser, setCurrentUser] = useState(() => {
    const temp = getCurrentUser();
    return temp;
  });

  // resolve login function that is used to set the parameters.
  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsStudent(user.user.roles[0].name === "STUDENT");
    }
  };

  // Applogout function that will clear the local storage(logout()) and all the variables are set to the 
  // initial state.
  const Applogout = () => {
    logout(); // removes the userDetails from the local storage.
    setCurrentUser(null);
    setIsAdmin(false);
    setIsStudent(false);
    removeBookFromStorage();
    removeRequestFromStorage();
    removeBookStudentFromStorage();
    removeStudentFromStorage();
  }

  // useEffect function that will be used to run the resolveLogin.
  useEffect(() => {
    resolveLogin();
  }, []);
  
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark nav">
          {/* this shall get you back to the home page */}
          <Link to={"/"} className="navbar-brand">
            Library
          </Link>
          <div className="navbar-nav mr-auto">

            {isAdmin && (
              <>
              <li className="nav-item">
                {/* this will be used to save a book. */}
              <Link to={"/booksSave"} className="nav-link">
                Save a Book
              </Link>
            </li>
            </>
            )}

            {currentUser ? (
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                {/* this will be used to see a set of books */}
                Books
              </Link>
            </li>
            
            ): null}

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to={"/allRequests"} className="nav-link">
                    {/* this will be used to see the list of requests. */}
                    Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link">
                    {/* This will be used to see the list of students */}
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  {/* this will be used to see the book issue info. */}
                  <Link to={"/bookStudentList"} className="nav-link">Book Issue info</Link>
                </li>
              </>

            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              
              {isAdmin && (
                <li>
                  {/*  This will be used to redirect you to the form for registering a new admin*/}
                  <Link to = {"/registerAdmin"} className="nav-link">
                    Register New Admin
                  </Link>
                </li>
              )}

              {isStudent &&(
                <>
                <li className="nav-item">
                  {/* This will be used to see the requests for that particilar student(logged in) */}
                  <Link to={"/requestsForStudent"} className="nav-link">
                    Pending Requests
                  </Link>
                </li>


                <li className="nav-item">
                  {/* This will be used to get book issue info for that student */}
                  <Link to={"/bookStudentByStudent"} className="nav-link">
                    Issued Books
                  </Link>
                </li>

                <li className="nav-item">
                  {/* This will be used see the studentDetails  */}
                  <Link to={"/studentDetail"} className="nav-link">
                    Profile
                  </Link>
                </li>
                </>   
              )}

              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={Applogout}>
                  {/* This is used for Logging out */}
                  Log out
                </Link>
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  {/* This will be used to login after entering the credentials. */}
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registerStudent"} className="nav-link">
                  {/* This will be used for sign up. */}
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            {/* the various pages present in the website */}
            <Route path="/" element={<Home currentUser={currentUser}/>} />
            <Route path="/home" element={<Home currentUser={currentUser}/>} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsStudent = {setIsStudent}/>} />
            <Route path="/registerStudent" element={<SignupStudent />} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/books" element={<BooksList/>}/>
            <Route path="/moreInfo" element={<BookDetails isStudent={isStudent} isAdmin={isAdmin}/>} />
            <Route path="/booksSave" element={<BookSaveForm/>}/>
            <Route path="/booksUpdate" element={<BookUpdateForm/>}/>
            <Route path="/students" element={<StudentList/>}/>
            <Route path="/updateStudent" element={<UpdateStudent/>} />
            <Route path="/studentDetail" element={<StudentDetails isStudent={isStudent} isAdmin={isAdmin}/>}/>
            <Route path="/bookRequest" element={<BookRequestForm/>}/>
            <Route path="/allRequests" element={<RequestList choice={1}/>} />
            <Route path="/requestDetails" element={<RequestDetails isStudent={isStudent} isAdmin={isAdmin} />} />
            <Route path="/requestsForBook" element={<RequestList choice={2}/>}/>
            <Route path="/bookStudentDetail" element={<BookStudentDetails isAdmin={isAdmin}/>}/>
            <Route path="/bookStudentList" element={<BookStudentList choice={1}/>}/>
            <Route path="/bookStudentByStudent" element={<BookStudentList choice={2} />}/>
            <Route path="/bookStudentByBook" element={<BookStudentList choice={3} />}/>
            <Route path="/requestsForStudent" element={<RequestList choice={3}/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
