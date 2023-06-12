package com.library.library.dao;

import com.library.library.entity.BookStudent;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BookStudentDAOImpl implements BookStudentDAO{

    private EntityManager entityManager;

    @Autowired
    public BookStudentDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    public BookStudent findRequestById(int id) {
        return this.entityManager.find(BookStudent.class,id);
    }

    @Override
    public List<BookStudent> findAllBookRequest() {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent", BookStudent.class);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findRequestbyBook(int book_code) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where book_code = :book_code", BookStudent.class);
        tpq.setParameter("book_code",book_code);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findRequestbyStudent(int student_id) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where student_id = :id", BookStudent.class);
        tpq.setParameter("id", student_id);
        return tpq.getResultList();
    }

    @Override
    public void deleteRequestById(int id) {
        BookStudent bookStudent = this.entityManager.find(BookStudent.class,id);
        this.entityManager.remove(bookStudent);
    }

    @Override
    public void makeRequest(BookStudent bookStudent) {
        entityManager.persist(bookStudent);
    }
}
