package com.library.library.service;

import com.library.library.dao.BookDAO;
import com.library.library.entity.Book;
import com.library.library.exception.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private BookDAO bookDAO;

    @Autowired
    public BookService(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

    public Book findBookByCode(int book_code) throws BookNotFoundException
    {
        Book book = this.bookDAO.findBookById(book_code);
        if (book == null){
            throw new BookNotFoundException();
        }
        return book;
    }

    public Book addBook(Book book)
    {
        return this.bookDAO.saveBook(book);
    }

    public Book deleteBookByCode(int book_code) throws BookNotFoundException
    {
        Book book = this.bookDAO.findBookById(book_code);
        if(book==null){
            throw new BookNotFoundException();
        }
        return this.bookDAO.deleteById(book_code);
    }

    public List<Book> findAllBooks(){
        return bookDAO.findAllbooks();
    }
    
    public Book updateBook(Book book) throws BookNotFoundException{
        Book b = this.bookDAO.findBookById(book.getBookCode());
        if(b == null){
            throw new BookNotFoundException();
        }
        return bookDAO.updateBook(book);
    }
}
