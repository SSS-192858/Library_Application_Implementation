import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {deleteStudent} from "../services/auth_services"
import { useNavigate } from "react-router-dom";

const StudentDetails = ({student, isStudent, isAdmin, setStudent}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteStudent(student.id);
        setOpen(false);
        setStudent(null)
        navigate("/students")
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc = () => {
        navigate("/updateStudent")
    }

    return (
        <div>
            <p>{student.id}</p>
            <p>{student.studentName}</p>
            <p>{student.email}</p>
            <p>{student.phone}</p>

            {isStudent && (
                <button onClick={navFunc} className="btn btn-primary btn-block" type="submit">
                Update Info
                </button>
            )}

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