package com.library.library.service;

import com.library.library.dao.BookDAO;
import com.library.library.entity.Book;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private BookDAO bookDAO;

    @Autowired
    public BookService(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

    public Book findBookByCode(int book_code)
    {
        return this.bookDAO.findBookById(book_code);
    }

    public void addBook(Book book)
    {
        this.bookDAO.saveBook(book);
    }

    public void deleteBookByCode(int book_code)
    {
        this.bookDAO.deleteById(book_code);
    }

    public List<Book> findAllBooks(){
        return bookDAO.findAllbooks();
    }
    
    public void updateBook(Book book){
        bookDAO.updateBook(book);
    }
}
