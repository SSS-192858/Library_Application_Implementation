import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {deleteStudent} from "../services/auth_services"
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
        <div>
            <p>{student.id}</p>
            <p>{student.studentName}</p>
            <p>{student.email}</p>
            <p>{student.phone}</p>

            {isStudent && (
                <button onClick={navFunc1} className="btn btn-primary btn-block" type="submit">
                Update Info
                </button>
            )}

            <button onClick={navFunc2} className="btn btn-primary btn-block" type="submit">
                See all Book Requests
            </button>

            <button onClick={navFunc3} className="btn btn-primary btn-block" type="submit">
                See all issued books
            </button>

            {isAdmin && (
                <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                    Delete Student
                </button>
            )}

            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {student.studentName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudentDetails;