package com.library.library.service;

import com.library.library.dao.BookDAO;
import com.library.library.entity.Book;
import jakarta.transaction.Transactional;

import java.util.Optional;

public class BookService {

    private BookDAO bookDAO;

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
}
