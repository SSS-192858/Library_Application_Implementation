import React from 'react';
import { useEffect, useState } from 'react';
import BookListItem from '../common/bookListItem';
import { getBooks } from '../services/user_services';

function BooksList() {
  const [books, setBooks] = useState([]);

  const getBooksComp = async () => {
    const response = await getBooks();
    setBooks(response)
  }

  useEffect(() => {
    getBooksComp()
  },[])
    
  return (
    <>
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
          <div id="space" key= {data.bookCode} className='col-md-4'><BookListItem book={data}/></div>
        ))}
        </div>
      </div>
    </>
  );
}

export default BooksList;