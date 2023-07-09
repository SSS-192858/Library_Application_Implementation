package com.library.library.dao;

import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

    //find bookStudent pairing by id
    @Override
    public BookStudent findBookStudentById(int id) {
        return this.entityManager.find(BookStudent.class,id);
    }

    //while issuing a book, check whether the requested dates overlap with a different record of the same book
    @Override
    public boolean checkOverlap(Request request) {
        Date startDate = request.getStartDate();
        Date endDate = request.getEndDate();
        Integer book = request.getBook().getBookCode();
        // condition that finds overlapping records
        TypedQuery<BookStudent> typedQuery = this.entityManager.createQuery("FROM BookStudent where book.bookCode = :bookId and ((startDate between :startDate and :endDate) or (endDate between :startDate and :endDate) or (startDate < :startDate and endDate > :endDate))", BookStudent.class);
        typedQuery.setParameter("bookId",book);
        typedQuery.setParameter("startDate",startDate);
        typedQuery.setParameter("endDate",endDate);
        System.out.println(typedQuery.getResultList());
        return !(typedQuery.getResultList().isEmpty());
    }

    // all book issue records
    @Override
    public List<BookStudent> findAllBookStudent() {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent", BookStudent.class);
        return tpq.getResultList();
    }

    // find all the issue records for a particular book by the book code
    @Override
    public List<BookStudent> findBookStudentByBook(int book_code) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where book.bookCode = :book_code", BookStudent.class);
        tpq.setParameter("book_code", book_code);
        return tpq.getResultList();
    }

    // find all the times a particular student issued any book
    @Override
    public List<BookStudent> findBookStudentByStudent(Integer student_id) {
        TypedQuery<BookStudent> tpq = this.entityManager.createQuery("FROM BookStudent where student.id = :id", BookStudent.class);
        tpq.setParameter("id", student_id);
        return tpq.getResultList();
    }

    //delete a bookStudent record
    @Override
    @Transactional
    public BookStudent deleteBookStudentById(int id) {
        BookStudent bookStudent = this.entityManager.find(BookStudent.class,id);
        this.entityManager.remove(bookStudent);
        return bookStudent;
    }

    // add a new bookStudent record
    @Override
    @Transactional
    public BookStudent makeBookStudent(BookStudent bookStudent) {
        return entityManager.merge(bookStudent);
    }
}
