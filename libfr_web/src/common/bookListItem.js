import React from "react";
import { setBookInStorage } from "../services/localStorageHandler";

const BookListItem = ({book}) => {

    const handleClick = () => {
        setBookInStorage(book);
    }

    return (
        <a href="/moreInfo">
            <div className="card1" onClick={handleClick}>
                <div className="card-body">
                    <h1>{book.bookTitle}</h1>
                    <br />
                    <h4>{book.author}</h4>
                    <p>{book.bookDesc}</p>
                </div>
            </div>
        </a>
    )
}
export default BookListItem;