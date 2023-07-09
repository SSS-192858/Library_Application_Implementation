import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import {useBookSaveValidator} from "../validators/BookSaveValidator";
import {updateBook} from '../services/user_services';
import { getBookFromStorage, removeBookFromStorage } from "../services/localStorageHandler";
import image from "../assets/image.png";

//component to update the details of a book
const BookUpdateForm = () => {

    //state variable to show the dialog box
    const [open,setOpen] = React.useState(false);

    //book is taken from local storage, to display on screen
    const [book, setBook] = useState(() => {
      const temp = getBookFromStorage();
      return temp;
    })

    //form component, initialised to the book variables
    const [form, setForm] = useState({
        bookTitle: book.bookTitle,
        author: book.author,
        bookDesc: book.bookDesc
  });

  const navigate = useNavigate();

  //functions to handle dialog box
  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
    navigate("/books")
    removeBookFromStorage();
  };

  const [message, setMessage] = useState("");

  const {errors, validateForm} = useBookSaveValidator(form)

  //to take care of form state variable changes
  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  //called when the submit button is pressed
  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();    
    //check if valid, if not return
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    //otherwise update the book in the db
    updateBook(book.bookCode, form.bookTitle, form.bookDesc, form.author).then(
        response => {
            //show dialog box for success
            handleClickToOpen()
        },
        error => {
          // else set error message
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage)
        }
    )
  };

  return (

    <div className="col-md-12">
        <div className="card card-container">
              <img
                src={image}
                alt="profile-img"
                className="profile-img-card"
              />

            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <p>
                        Book Code : {book.bookCode}
                    </p>
               </div>

               {/* book title input box */}
                <div className="form-group">
                    <label htmlFor="bookTitle">Book Title</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="bookTitle"
                    name="bookTitle"
                    placeholder="book name"
                    value={form.bookTitle}
                    onChange={onUpdateField}
                    />

                    {errors.bookTitle.dirty && errors.bookTitle.error ? (
                            <div className="alert alert-danger" role="alert">{errors.bookTitle.message}</div>
                            ) : null}
                </div>

                {/* book description input */}
                <div className="form-group">
                    <label htmlFor="bookDesc">Book Desc</label>
                    <textarea
                    className="form-control"
                    type="bookDesc"
                    aria-label="bookDesc"
                    name="bookDesc"
                    placeholder="book description"
                    value={form.bookDesc}
                    onChange={onUpdateField}
                    />

                    {errors.bookDesc.dirty && errors.bookDesc.error ? (
                            <div className="alert alert-danger" role="alert">{errors.bookDesc.message}</div>
                            ) : null}
                </div>

                {/* author input */}
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                    className="form-control"
                    type="author"
                    aria-label="author"
                    name="author"
                    placeholder="book author"
                    value={form.author}
                    onChange={onUpdateField}
                    />

                    {errors.author.dirty && errors.author.error ? (
                            <div className="alert alert-danger" role="alert">{errors.author.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-success btn-block" type="submit">
                    Update Book
                    </button>
                </div>

                {/* show error message if unsuccessful */}
                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>

        {/* dialog box for success notification */}
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Book Saved successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Book has been updated successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                          Close
                    </button>
                </DialogActions>
            </Dialog>
    </div>
  );
};

export default BookUpdateForm;