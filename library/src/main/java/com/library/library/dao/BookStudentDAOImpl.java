package com.library.library.dao;

import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

@Repository
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
    public boolean checkOverlap(Request request) {
        Date startDate = request.getStartDate();
        Date endDate = request.getEndDate();
        Integer book = request.getBook().getBookCode();

        TypedQuery<BookStudent> typedQuery = this.entityManager.createQuery("FROM BookStudent where book.bookCode = :bookId and startDate not between :startDate and :endDate and endDate not between :startDate and :endDate", BookStudent.class);
        typedQuery.setParameter("bookId",book);
        typedQuery.setParameter("startDate",startDate);
        typedQuery.setParameter("endDate",endDate);
        return !typedQuery.getResultList().isEmpty();
    }

    @Override
    public List<BookStudent> findAllBookStudent() {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent", BookStudent.class);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findBookStudentByBook(int book_code) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where book.bookCode = :book_code", BookStudent.class);
        tpq.setParameter("book_code",book_code);
        return tpq.getResultList();
    }

    @Override
    public List<BookStudent> findBookStudentByStudent(int student_id) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where student.id = :id", BookStudent.class);
        tpq.setParameter("id", student_id);
        return tpq.getResultList();
    }

    @Override
    @Transactional
    public void deleteBookStudentById(int id) {
        BookStudent bookStudent = this.entityManager.find(BookStudent.class,id);
        this.entityManager.remove(bookStudent);
    }

    @Override
    @Transactional
    public BookStudent makeBookStudent(BookStudent bookStudent) {
        return entityManager.merge(bookStudent);
    }
}
