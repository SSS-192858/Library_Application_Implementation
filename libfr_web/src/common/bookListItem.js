import React from "react";
import { setBookInStorage } from "../services/localStorageHandler";

const BookListItem = ({book}) => {

    //when we click on the list item, it sets the book in local storage, and migrates there
    const handleClick = () => {
        setBookInStorage(book);
    }

    return (
        //clickable list item, which shows the book info, and takes to BookDetails page when clicked
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