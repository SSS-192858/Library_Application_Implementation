package com.library.library.dao;
import java.util.List;
import com.library.library.entity.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookDAO  {
    public void saveBook(Book book);

    public Book findBookById(int book_code);

    public void deleteById(int book_code);

    public void updateBook(Book book);

    public List<Book> findAllbooks();

}
