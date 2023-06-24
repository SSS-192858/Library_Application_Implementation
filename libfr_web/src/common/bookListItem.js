import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const BookListItem = ({book, setBook}) => {

    const handleClick = () => {
        setBook(book)
    }

    useEffect(() => {
        console.log(book)
    })

    return (
        <div className="book" onClick={handleClick}>
            <Link to="/moreInfo">
                <p>{book.bookCode}</p>
                <p>{book.bookTitle}</p>
                <p>{book.author}</p>
                <p>{book.bookDesc}</p>
            </Link>
        </div>
    )
}
export default BookListItem;