import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import {useBookSaveValidator} from "../validators/BookSaveValidator";
import {saveBook} from '../services/user_services';
import { removeBookFromStorage } from "../services/localStorageHandler";
import image from "../assets/image.png";

//component to create a new book in the library
const BookSaveForm = () => {

    //dialog box state
    const [open,setOpen] = React.useState(false);

    //form state
    const [form, setForm] = useState({
        bookTitle: "",
        author: "",
        bookDesc:""
    });

  const navigate = useNavigate();

  //functions to handle open and close of dialog box
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

  //function to handle the form state variable
  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  //function called when the submit button is clicked
  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();
    
    //if valid, continue, else stop
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    //send request to backend
    saveBook(form.bookTitle, form.bookDesc, form.author).then(
        response => {
          // if successful, open dialog box, else show error
            handleClickToOpen()
        },
        error => {
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

              {/* book name input */}
            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="bookTitle">Book Title</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="bookTitle"
                    name="bookTitle"
                    placeholder="Book Name"
                    value={form.bookTitle}
                    onChange={onUpdateField}
                    />

                    {errors.bookTitle.dirty && errors.bookTitle.error ? (
                            <div className="alert alert-danger" role="alert">{errors.bookTitle.message}</div>
                            ) : null}
                </div>

                {/* description input */}
                <div className="form-group">
                    <label htmlFor="bookDesc">Book Desc</label>
                    <textarea
                    className="form-control"
                    type="bookDesc"
                    aria-label="bookDesc"
                    name="bookDesc"
                    placeholder="Book Description"
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
                    placeholder="Author"
                    value={form.author}
                    onChange={onUpdateField}
                    />

                    {errors.author.dirty && errors.author.error ? (
                            <div className="alert alert-danger" role="alert">{errors.author.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-success btn-block form-button" type="submit">
                    Save Book
                    </button>
                </div>

                {/* show error message if not successful */}
                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>


        {/* show dialog box in case of success */}
        <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Book Saved successfully"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Book was saved successfully
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

export default BookSaveForm;