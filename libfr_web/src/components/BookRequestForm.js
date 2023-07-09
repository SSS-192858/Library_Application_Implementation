import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {registerRequest} from "../services/request_services";
import { RequestBookValidator } from "../validators/RequestBookValidator";
import { getBookFromStorage, getStudentFromStorage } from "../services/localStorageHandler";
import image from "../assets/image.png";

//component to create a new request for a book
const BookRequestForm = () => {

    //state to handle the dialog box
    const [open, setOpen] = React.useState(false);

    //form variables
    const [form, setForm] = useState({
        startDate:"",
        endDate:""
    });

    //we retrieve book and student from storage, to send to api when we fill the form
    const [book, setBook] = useState(() => {
        const temp = getBookFromStorage();
        return temp;
    })

    const [student, setStudent] = useState(() => {
        const temp = getStudentFromStorage();
        return temp;
    })

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    //validation 
    const {errors, validateForm} = RequestBookValidator(form);

    //functions to handle opening and closing of dialog box
    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
        navigate("/books")
    };

    //function to manage the form state variable 
    const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    //function called when submit button is pressed 
    const onSubmitForm = e => {
        setMessage("")
        e.preventDefault();    

        //validation logic
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;

        //if valid, register request to backend
        registerRequest(student,book,form.startDate,form.endDate).then(
            response => {
                //open dialog box if succeeded
                handleClickToOpen()
            },
            error => {
                //else set error message
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
                
                {/* start date input field */}
                <div className="form-group">
                    <label htmlFor="startDate">startDate</label>
                    <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        aria-label="startDate"
                        value={form.startDate}
                        onChange={onUpdateField}
                    />

                    {errors.startDate.dirty && errors.startDate.error ? (
                            <div className="alert alert-danger" role="alert">{errors.username.message}</div>
                            ) : null}
                    </div>

                    {/* end date input field */}
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            aria-label="endDate"
                            value={form.endDate}
                            onChange={onUpdateField}
                        />

                        {errors.endDate.dirty && errors.endDate.error ? (
                            <div className="alert alert-danger" role="alert">{errors.password.message}</div>
                            ) : null}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success btn-block form-button">Request Book</button>
                    </div>

                    {/* cn=onditionally show error message */}
                    {message ? 
                        <div className="alert alert-danger" role="alert">{message}</div>
                        : null}
                </form>
            </div>

            {/* dialog box to notify about the success of the request to the api */}
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Request Book"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We have received your request kindly wait till the Admin Approves it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleToClose}
                        color="primary" autoFocus>
                        Go to Books list
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BookRequestForm;