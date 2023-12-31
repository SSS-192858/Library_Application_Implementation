package com.library.library.dao;

import com.library.library.entity.Book;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class BookDAOImpl implements BookDAO {

    private EntityManager entityManager;

    @Autowired
    public BookDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    //find book by book code
    @Override
    public Book findBookById(int book_code) {
        return this.entityManager.find(Book.class,book_code);
    }

    //get all books
    @Override
    public List<Book> findAllbooks() {
        TypedQuery<Book> tpq = this.entityManager.createQuery("FROM Book",Book.class);
        return tpq.getResultList();
    }

    //delete a book by its book code
    @Override
    @Transactional
    public Book deleteById(int book_code) {
        Book book = this.entityManager.find(Book.class,book_code);
        if(book == null)
        {
            System.out.println("Not found");
            return null;
        }
        this.entityManager.remove(book);
        return book;
    }

    //save a new book
    @Override
    @Transactional
    public Book saveBook(Book book) {
        this.entityManager.persist(book);
        return book;
    }

    //update existing book record
    @Override
    @Transactional
    public Book updateBook(Book book) {
        return this.entityManager.merge(book);
    }
}
