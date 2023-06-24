import React from "react";

const BookDetails = ({book}) => {

    return (
        <div>
            <p>{book.bookCode}</p>
            <p>{book.bookTitle}</p>
            <p>{book.author}</p>
            <p>{book.bookDesc}</p>
        </div>
    )
}

export default BookDetails;