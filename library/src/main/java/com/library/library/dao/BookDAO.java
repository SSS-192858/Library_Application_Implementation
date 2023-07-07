package com.library.library.dao;

import com.library.library.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookDAO  {
    public Book saveBook(Book book);

    public Book findBookById(int book_code);

    public Book deleteById(int book_code);

    public Book updateBook(Book book);

    public List<Book> findAllbooks();

}
