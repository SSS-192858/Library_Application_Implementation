import React from 'react';
import { useEffect, useState } from 'react';
import BookListItem from '../common/bookListItem';
import { getBooks } from '../services/user_services';

//component to show the list of books in the library
function BooksList() {
  const [books, setBooks] = useState([]);

  //function called in useEffect to get the books in library and display on screen
  const getBooksComp = async () => {
    const response = await getBooks();
    setBooks(response)
  }

  useEffect(() => {
    getBooksComp()
  },[])

  return (
    <>
    {/* Nothing to show is displayed if no books, else books are displayed in a grid format */}
      { (books.length === 0) ? <div className='container banner'>
        <header className='jumbotron banner'> 
          <h5>Nothing to show</h5>
        </header>
        
      </div>
        : null
      } 
      <div className='container'>
        <div className='row'>

        {books.map((data) => (
          <div id="space" key= {data.bookCode} className='col-lg-4 col-sm-12 col-md-6'><BookListItem book={data}/></div>
        ))}
        </div>
      </div>
    </>
  );
}

export default BooksList;