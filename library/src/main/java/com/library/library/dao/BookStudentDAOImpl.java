package com.library.library.dao;

import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public class BookStudentDAOImpl implements BookStudentDAO{

    private EntityManager entityManager;

    @Autowired
    public BookStudentDAOImpl(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Override
    public BookStudent findBookStudentById(int id) {
        return this.entityManager.find(BookStudent.class,id);
    }

    @Override
    public List<BookStudent> findAllBookStudent() {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent", BookStudent.class);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findBookStudentByBook(int book_code) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where book_code = :book_code", BookStudent.class);
        tpq.setParameter("book_code",book_code);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findBookStudentByStudent(int student_id) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where student_id = :id", BookStudent.class);
        tpq.setParameter("id", student_id);
        return tpq.getResultList();
    }

    @Override
    public void deleteBookStudentById(int id) {
        BookStudent bookStudent = this.entityManager.find(BookStudent.class,id);
        this.entityManager.remove(bookStudent);
    }

    @Override
    public void makeBookStudent(BookStudent bookStudent) {
        entityManager.persist(bookStudent);
    }
}
