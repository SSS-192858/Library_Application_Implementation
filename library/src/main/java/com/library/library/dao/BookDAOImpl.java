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

    @Override
    public Book findBookById(int book_code) {
        return this.entityManager.find(Book.class,book_code);
    }

    @Override
    public List<Book> findAllbooks() {
        TypedQuery<Book> tpq = this.entityManager.createQuery("FROM Book",Book.class);
        return tpq.getResultList();
    }

    @Override
    @Transactional
    public void deleteById(int book_code) {
        Book book = this.entityManager.find(Book.class,book_code);
        if(book == null)
        {
            System.out.println("Not found");
            return;
        }
        this.entityManager.remove(book);
    }

    @Override
    @Transactional
    public Book saveBook(Book book) {
        this.entityManager.persist(book);
        return book;
    }

    @Override
    @Transactional
    public void updateBook(Book book) {
        this.entityManager.merge(book);
    }
}
