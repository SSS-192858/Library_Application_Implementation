import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {deleteStudent} from "../services/user_services"
import { useNavigate } from "react-router-dom";
import { getStudentFromStorage, removeStudentFromStorage } from "../services/localStorageHandler";

// This will be used to show the student details.
const StudentDetails = ({isStudent, isAdmin}) => {
    // open variable that will be used for working of the dialog box.
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // student variable that will be used for setting the student.
    const [student, setStudent] = useState(() => {
        const temp = getStudentFromStorage();
        return temp;
    })

    // this function will be called when we want to delete a student.
    const handleToClose = () => {
        deleteStudent(student.id);
        setOpen(false);
        removeStudentFromStorage();
        navigate("/students")
    };

    // This function will be called when we to cancel any operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // this function will be called when we to update student details.
    const navFunc1 = () => {
        navigate("/updateStudent");
    } 

    // this function will be called when we to see the request for that student.
    const navFunc2 = () => {
        navigate("/requestsForStudent");
    }

    // this function will be called when we want to see the book issue information for that student.
    const navFunc3 = () => {
        navigate("/bookStudentByStudent")
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                        Student Name - {student.studentName}
                    </h1>
                    <div className="card-text">
                        <p>Student Email - {student.email}</p>
                        <p>Student Phone - {student.phone}</p>
                    </div>

                        {isStudent && (
                            // This will be used for updating student info.
                            <button onClick={navFunc1} className="btn btn-warning" type="submit">
                            Update Info
                            </button>
                        )}

                        <button onClick={navFunc2} className="btn btn-success" type="submit">
                            {/* this will be used for seeing all requests. */}
                            See all Book Requests
                        </button>

                        <button onClick={navFunc3} className="btn btn-info" type="submit">
                            {/*This will be used for seeing the book that are currently issued to the student.*/}
                            See all issued books
                        </button>

                        {isAdmin && (
                            <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit">
                                {/* This will be used for deleting the student. */}
                                Delete Student
                            </button>
                        )}
                </div>
            </div>
            

            {/* Dialog box that will be used for deleting a student*/}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {student.studentName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="light" autoFocus>
                        {/* button for cancelling the operation */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="warning" autoFocus>
                        {/*button for deleting the student information */}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudentDetails;