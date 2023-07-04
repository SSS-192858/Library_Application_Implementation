import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBook } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getBookFromStorage, removeBookFromStorage, setBookInStorage } from "../services/localStorageHandler";

const BookDetails = ({isStudent,isAdmin}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [book, setBook] = useState(() => {
        const temp = getBookFromStorage();
        return temp;
    })

    const handleToClose = () => {
        deleteBook(book.bookCode);
        removeBookFromStorage();
        setOpen(false);
        navigate("/books");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc = () => {
        navigate("/booksUpdate")
    }

    const handleRequest = ()=>{
        setBookInStorage(book);
        console.log(book);
        navigate("/bookRequest")
    }

    const seeRequestsForBook = () => {
        navigate("/requestsForBook");
    }

    const seeBookStudentsForBook = () => {
        navigate("/bookStudentByBook");
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">
                        {book.bookTitle}
                    </h1>
                    <div className="card-text">
                        <p>Book Code - {book.bookCode}</p>
                        <p>Book Author - {book.author}</p>
                        <p>{book.bookDesc}</p>
                        <br />
                    </div>

                    {isStudent &&
                    <button onClick={handleRequest} className="btn btn-info">
                        Request Book
                    </button>    
                    }  

                    {isAdmin && 

                    <>
                    <button onClick={seeRequestsForBook} className="btn btn-success">
                        See all requests for this book
                    </button>

                    <button onClick={navFunc} className="btn btn-warning">
                        Update Book
                    </button>

                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger">
                        Delete Book
                    </button>

                    </>
                    } 

                    {isAdmin && 
                        <button onClick={seeBookStudentsForBook} className="btn btn-info">
                            See all records for issue of this book
                        </button>
                    }
                </div>
            </div>
             
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete Book"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the book?
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

export default BookDetails;