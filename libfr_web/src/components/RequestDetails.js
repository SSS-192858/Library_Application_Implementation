import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteRequest , accept } from "../services/request_services";
import { useNavigate } from "react-router-dom";
import { getRequestFromStorage } from "../services/localStorageHandler";
import dateFormat from "dateformat";

const RequestDetails = ({isStudent,isAdmin}) => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const [request, setRequest] = useState(() => {
        const temp = getRequestFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteRequest(request.slno);
        setOpen(false);
        setOpen1(false);
        if(isAdmin){navigate("/allRequests")}
        else if(isStudent){navigate("/requestsForStudent")}
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const handleCancelAccept = () => {
        setAcceptOpen(false);
    }

    const handleAccept = async() => {
        accept(request).then(
            response => {
                setAcceptOpen(false);
                navigate("/allRequests")
            },
            error => {
              const resMessage = "The book can't be assigned for the requested dates as it has already been issued to someone else for these dates."
              setMessage(resMessage);
              setAcceptOpen(false);
              setOpen1(true);
            }
        );
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                    {request.slno}. {request.book.bookTitle} - {request.student.studentName}
                    </h1>
                    <div className="card-text">
                        
                        <h4>
                            Book Details :
                        </h4>
                        <p></p>
                        <p>Author : {request.book.author}</p>
                        <p>Description : {request.book.bookDesc}</p>

                        <h4>
                            Student Details :
                        </h4>
                        <p></p>
                        <p>Email : {request.student.email}</p>
                        <p>Phone : {request.student.phone}</p>

                        <p>
                            Start Date : {dateFormat(bookStudent.student.startDate,"fullDate")}
                        </p>
                        
                        <p>
                            End Date : {dateFormat(bookStudent.endDate,"fullDate")}
                        </p>
                </div>

            {isAdmin &&
            <button onClick={()=>{setAcceptOpen(true)}} className="btn btn-success" type="submit">
                Accept
            </button>
            }
            <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit" >
                Delete
            </button>
        </div></div>
            {message==="" ? (
                <Dialog open={acceptOpen} onClose={handleAccept}>
                    <DialogTitle>{"Accept Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCancelAccept} color="light" autoFocus>
                            Cancel
                        </button>
                        <button onClick={handleAccept}
                            color="success" autoFocus>
                            Accept
                        </button>
                        
                    </DialogActions>
                </Dialog>):(
                <Dialog open={open1} onClose={handleToClose}>
                    <DialogTitle>{"Delete Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleToClose}
                            color="warning" autoFocus>
                            Delete Request
                        </button>
                        
                    </DialogActions>
                </Dialog>
            ) 
            }    
            
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Request"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the request?
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

export default RequestDetails;