package com.library.library.service;

import com.library.library.dao.BookDAO;
import com.library.library.entity.Book;
import com.library.library.exception.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    //all methods call the dao methods to get the job done
    private BookDAO bookDAO;

    @Autowired
    public BookService(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

    //to find the book by book code, throws exception if not found
    public Book findBookByCode(int book_code) throws BookNotFoundException
    {
        Book book = this.bookDAO.findBookById(book_code);
        if (book == null){
            throw new BookNotFoundException();
        }
        return book;
    }

    //to add a book to the database
    public Book addBook(Book book)
    {
        return this.bookDAO.saveBook(book);
    }

    //to delete a book, throws exception if book is not found
    public Book deleteBookByCode(int book_code) throws BookNotFoundException
    {
        Book book = this.bookDAO.findBookById(book_code);
        if(book==null){
            throw new BookNotFoundException();
        }
        return this.bookDAO.deleteById(book_code);
    }

    //to get list of all books in the library
    public List<Book> findAllBooks(){
        return bookDAO.findAllbooks();
    }

    //to update the book in the library, if no throws exception if no book found
    public Book updateBook(Book book) throws BookNotFoundException{
        Book b = this.bookDAO.findBookById(book.getBookCode());
        if(b == null){
            throw new BookNotFoundException();
        }
        return bookDAO.updateBook(book);
    }
}
