import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBookStudent } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getBookStudentFromStorage } from "../services/localStorageHandler";
import dateFormat from "dateformat";
const BookStudentDetails = ({isAdmin}) => {

    const [bookStudent, setBookStudent] = useState(() => {
        const temp = getBookStudentFromStorage();
        return temp;
    })

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteBookStudent(bookStudent.slno);
        setOpen(false);
        navigate("/booksStudent");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                    {bookStudent.slno}. {bookStudent.book.bookTitle} - {bookStudent.student.studentName}
                    </h1>
                    <div className="card-text">
                        
                        <h4>
                            Book Details :
                        </h4>
                        <p></p>
                        <p>Author : {bookStudent.book.author}</p>
                        <p>Description : {bookStudent.book.bookDesc}</p>

                        <h4>
                            Student Details :
                        </h4>
                        <p></p>
                        <p>Email : {bookStudent.student.email}</p>
                        
                        <p>Phone : {bookStudent.student.phone}</p>

                        <p>
                            Start Date : {dateFormat(bookStudent.startDate,"fullDate")}
                        </p>
                        
                        <p>
                            End Date :{dateFormat(bookStudent.endDate,"fullDate")}
                        </p>
                </div>
                    {isAdmin && 
                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit">
                        Delete BookStudent
                    </button>
                    }
                </div>
        </div> 
                <Dialog open={open} onClose={handleToClose}>
                    <DialogTitle>{"Delete BookStudent"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCancel} color="light" autoFocus>
                            Cancel
                        </button>
                        <button onClick={handleToClose}
                            color="warning" autoFocus>
                            Delete BookStudent
                        </button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default BookStudentDetails;