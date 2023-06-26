import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteBook } from "../services/auth_services";
import { useNavigate } from "react-router-dom";

const BookDetails = ({book}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToClose = () => {
        deleteBook(book.bookCode);
        setOpen(false);
        navigate("/books");
    };

    const handleCancel = ()=>{
        setOpen(false);
    }

    const navFunc = () => {
        navigate("/booksUpdate")
    }

    return (
        <div>
            <p>{book.bookCode}</p>
            <p>{book.bookTitle}</p>
            <p>{book.author}</p>
            <p>{book.bookDesc}</p>

            <button onClick={navFunc} className="btn btn-primary btn-block" type="submit">
                Update Book
            </button>

            <button onClick={()=>{setOpen(true)}} className="btn btn-primary btn-block" type="submit">
                Delete Book
            </button>

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