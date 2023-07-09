import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBook } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import { getBookFromStorage, removeBookFromStorage, setBookInStorage } from "../services/localStorageHandler";

//  This shall take two parameters, isStudent and isAdmin that will be used to identify the user.
const BookDetails = ({isStudent,isAdmin}) => {
    
    // open variable that will be used for the diaglog box.
    const [open, setOpen] = useState(false);
    // initialising a navigator.
    const navigate = useNavigate();

    // book varible that will be mapped to the selected Book by the user. 
    // The selected book would be stored in the storage.
    const [book, setBook] = useState(() => {
        const temp = getBookFromStorage();
        return temp;
    })

    // handle Close function that will be called when 
    // we want to delete the book.
    const handleToClose = () => {
        deleteBook(book.bookCode);
        removeBookFromStorage();
        setOpen(false);
        navigate("/books");
    };

    // this will be called when we to cancel any selected operation.
    const handleCancel = ()=>{
        setOpen(false);
    }

    // this function will be called when we want to update the book.
    const navFunc = () => {
        navigate("/booksUpdate")
    }

    // this function will be called when we want to request a book.
    const handleRequest = ()=>{
        setBookInStorage(book);
        navigate("/bookRequest")
    }

    // this function will be called when we want to see the requests for that book.
    const seeRequestsForBook = () => {
        navigate("/requestsForBook");
    }

    // this function will be called when we want to see the book issue info for that book.
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
                    // this will be used for requesting book.
                    <button onClick={handleRequest} className="btn btn-info">
                        Request Book
                    </button>    
                    }  

                    {isAdmin && 
                    <>
                    {/* this will be used for seeing the requests for the book */}
                    <button onClick={seeRequestsForBook} className="btn btn-success">
                        See all requests for this book
                    </button>
                    {/* this will be used for updating the book */}
                    <button onClick={navFunc} className="btn btn-warning">
                        Update Book
                    </button>

                    {/*This will be used for deleting the book*/}
                    <button onClick={()=>{setOpen(true)}} className="btn btn-danger">
                        Delete Book
                    </button>
                    </>
                    } 
                    {isAdmin && 
                        // This will be used for seeing all issue records for this book. 
                        <button onClick={seeBookStudentsForBook} className="btn btn-info">
                            See all records for issue of this book
                        </button>
                    }
                </div>
            </div>
             
             {/* Dialog book for deleting the book */}
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