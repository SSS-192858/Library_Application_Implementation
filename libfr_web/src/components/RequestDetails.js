import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteRequest , accept } from "../services/request_services";
import { useNavigate } from "react-router-dom";
import { getRequestFromStorage } from "../services/localStorageHandler";

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
        <div>
            <p>{request.slno}</p>
            <p>{request.student.id}</p>
            <p>{request.student.studentName}</p>
            <p>{request.student.email}</p>
            <p>{request.student.phone}</p>
            <p>{request.book.bookCode}</p>
            <p>{request.book.bookTitle}</p>
            <p>{request.book.author}</p>
            <p>{request.startDate}</p>
            <p>{request.endDate}</p>

            {isAdmin &&
            <button onClick={()=>{setAcceptOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Accept
            </button>
            }
            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit" >
                Delete
            </button>
            {message==="" ? (
                <Dialog open={acceptOpen} onClose={handleAccept}>
                    <DialogTitle>{"Accept Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCancelAccept} color="primary" autoFocus>
                            Cancel
                        </button>
                        <button onClick={handleAccept}
                            color="primary" autoFocus>
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
                            color="primary" autoFocus>
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