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

// This will be used for showing the request information.
const RequestDetails = ({isStudent,isAdmin}) => {

    // open and open1 that will be used for working of dialog boxes.
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    // acceptOpen variable that will be used in accepting the request.
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    // request object that will be storing the request from storage.
    const [request, setRequest] = useState(() => {
        const temp = getRequestFromStorage();
        return temp;
    })

    // This function will be called when we want to delete the request.
    const handleToClose = () => {
        deleteRequest(request.slno);
        setOpen(false);
        setOpen1(false);
        if(isAdmin){navigate("/allRequests")}
        else if(isStudent){navigate("/requestsForStudent")}
    };

    // This function will be called when we want to cancel any operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // This function will be called when we want to cancel the request.
    const handleCancelAccept = () => {
        setAcceptOpen(false);
    }

    // This function will be called when we accept the request .
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
                            Start Date : {dateFormat(request.startDate,"fullDate")}
                        </p>
                        
                        <p>
                            End Date : {dateFormat(request.endDate,"fullDate")}
                        </p>
                </div>

            {isAdmin &&
            // this will be used to accept the request.
            <button onClick={()=>{setAcceptOpen(true)}} className="btn btn-success" type="submit">
                Accept
            </button>
            }
            {/* This function will be used to delete the request. */}
            <button onClick={()=>{setOpen(true)}} className="btn btn-danger" type="submit" >
                Delete
            </button>
        </div></div>
        {/* Dialog box that will be used to confirm deleting the request. */}
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
                            {/* This will be used to cancel the operation. */}
                            Cancel
                        </button>
                        <button onClick={handleAccept}
                            // This will be used to accept the request. 
                            color="success" autoFocus>
                            Accept
                        </button>
                        
                    </DialogActions>
                </Dialog>):(
                    //Dialog box that will be used for confirming the delete of a request.
                <Dialog open={open1} onClose={handleToClose}>
                    <DialogTitle>{"Delete Request"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/*Button for deleting the requests  */}

                        <button onClick={handleToClose}
                            color="warning" autoFocus>
                            Delete Request
                        </button>
                        
                    </DialogActions>
                </Dialog>
            ) 
            }    
            
            {/* Dialog box to ask for confimation before the deletion of the request */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Request"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCancel} color="primary" autoFocus>
                        {/* This will be used to cancel the operation. */}
                        Cancel
                    </button>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                            {/* This will be used to delete the request. */}
                        Delete
                    </button>
                    
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RequestDetails;