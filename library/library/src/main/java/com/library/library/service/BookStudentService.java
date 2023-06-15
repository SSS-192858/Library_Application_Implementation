package com.library.library.service;

import com.library.library.dao.BookStudentDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.exception.BookStudentNotFound;
import com.library.library.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookStudentService {

    private BookStudentDAO bookStudentDAO;
    private StudentDAO studentDAO;

    @Autowired
    public BookStudentService (BookStudentDAO bookStudentDAO,StudentDAO studentDAO){
        this.bookStudentDAO = bookStudentDAO;
        this.studentDAO = studentDAO;
    }

    public BookStudent getBookStudentById(Integer id) throws BookStudentNotFound {
        BookStudent bs = bookStudentDAO.findBookStudentById(id);
        if(bs==null){
            throw new BookStudentNotFound();
        }else {
            return bs;
        }
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

    public BookStudent addNewBookStudentPair(BookStudent bookStudent)throws StudentNotFoundException{
        Integer st = bookStudent.getStudent().getId();
        Student student1 = this.studentDAO.getStudentById(st);
        if(student1==null) {
            throw new StudentNotFoundException();
        }
        return bookStudentDAO.makeBookStudent(bookStudent);
    }

    public void deleteById(Integer id) throws BookStudentNotFound{
        BookStudent bs = bookStudentDAO.findBookStudentById(id);
        if(bs==null){
            throw new BookStudentNotFound();
        }else {
            bookStudentDAO.deleteBookStudentById(id);
        }
    }

    public Boolean doesRequestOverlap(Request request){
        return this.bookStudentDAO.checkOverlap(request);
    }
}
