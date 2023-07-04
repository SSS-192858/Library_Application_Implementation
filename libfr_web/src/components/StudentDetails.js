import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {deleteStudent} from "../services/user_services"
import { useNavigate } from "react-router-dom";
import { getStudentFromStorage, removeStudentFromStorage } from "../services/localStorageHandler";

const StudentDetails = ({isStudent, isAdmin}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [student, setStudent] = useState(() => {
        const temp = getStudentFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteStudent(student.id);
        setOpen(false);
        removeStudentFromStorage();
        navigate("/students")
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc1 = () => {
        navigate("/updateStudent");
    } 

    const navFunc2 = () => {
        navigate("/requestsForStudent");
    }

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
                            <button onClick={navFunc1} className="btn btn-warning" type="submit">
                            Update Info
                            </button>
                        )}

                        <button onClick={navFunc2} className="btn btn-success" type="submit">
                            See all Book Requests
                        </button>

                        <button onClick={navFunc3} className="btn btn-info" type="submit">
                            See all issued books
                        </button>

                        {isAdmin && (
                            <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit">
                                Delete Student
                            </button>
                        )}
                </div>
            </div>
            

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {student.studentName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="light" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="warning" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudentDetails;