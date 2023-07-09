import { useState } from "react";
import { stringValidator } from "./validators";

// checks for errors in the form fields
const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useBookSaveValidator = form => {
    const [errors, setErrors] = useState({
        bookTitle: {
            dirty: false,
            error: false,
            message: "",
        },
        author: {
            dirty: false,
            error: false,
            message: "",
        },
        bookDesc: {
            dirty: false,
            error: false,
            message: ""
        }
    });

    // calling the validators from validators.js
    // and checking whether they can constitute a valid form entry

    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        var nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { bookTitle, author, bookDesc } = form;

        // checking the validity of data entered in various fields of the add a new book form

        if (nextErrors.bookTitle.dirty && (field ? field === "bookTitle" : true)) {
            const message = stringValidator(bookTitle, form);
            nextErrors.bookTitle.error = !!message;
            nextErrors.bookTitle.message = message;
            if (!!message) isValid = false;
        }

        if (nextErrors.bookDesc.dirty && (field ? field === "bookDesc" : true)) {
            const bookDescMessage = stringValidator(bookDesc, form);
            nextErrors.bookDesc.error = !!bookDescMessage;
            nextErrors.bookDesc.message = bookDescMessage;
            if (!!bookDescMessage) isValid = false;
        }

        if (nextErrors.author.dirty && (field ? field === "author" : true)) {
            const authorMessage = stringValidator(author, form);
            nextErrors.author.error = !!authorMessage;
            nextErrors.author.message = authorMessage;
            if (!!authorMessage) isValid = false;
        }

        // in case there are errors, return the error messages
        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    return {
        validateForm,
        errors,
    };
};