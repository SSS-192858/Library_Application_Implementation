package com.library.library.service;

import com.library.library.dao.BookStudentDAO;
import com.library.library.dao.OverlapDAO;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookStudentService {

    private BookStudentDAO bookStudentDAO;
    private OverlapDAO overlapDAO;

    @Autowired
    public BookStudentService (BookStudentDAO bookStudentDAO, OverlapDAO overlapDAO){
        this.bookStudentDAO = bookStudentDAO;
        this.overlapDAO = overlapDAO;
    }

    public BookStudent getBookStudentById(Integer id){
        return bookStudentDAO.findBookStudentById(id);
    }

    public List<BookStudent> getBookStudentByStudentId(Integer id){
        return bookStudentDAO.findBookStudentByStudent(id);
    }

    public List<BookStudent> getBookStudentByBookId(Integer id){
        return bookStudentDAO.findBookStudentByBook(id);
    }

    public List<BookStudent> getAllBookStudents(){
        return bookStudentDAO.findAllBookStudent();
    }

    public BookStudent addNewBookStudentPair(BookStudent bookStudent){
        return bookStudentDAO.makeBookStudent(bookStudent);
    }

    public void deleteById(Integer id){
        bookStudentDAO.deleteBookStudentById(id);
    }

    public Boolean doesRequestOverlap(Request request){
        List<BookStudent> bs = this.overlapDAO.overlap(request);
        return !bs.isEmpty();
    }
}
