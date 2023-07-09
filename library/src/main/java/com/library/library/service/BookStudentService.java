package com.library.library.service;

import com.library.library.dao.BookStudentDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.exception.BookNotFoundException;
import com.library.library.exception.BookStudentNotFound;
import com.library.library.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookStudentService {

    private BookStudentDAO bookStudentDAO;
    private StudentDAO studentDAO;

    //calls the corresponding dao methods, and throws exceptions if encountered
    @Autowired
    public BookStudentService (BookStudentDAO bookStudentDAO,StudentDAO studentDAO){
        this.bookStudentDAO = bookStudentDAO;
        this.studentDAO = studentDAO;
    }

    //get the book student record by id, throws exception if not found
    public BookStudent getBookStudentById(Integer id) throws BookStudentNotFound {
        BookStudent bs = bookStudentDAO.findBookStudentById(id);
        if(bs==null){
            throw new BookStudentNotFound();
        }else {
            return bs;
        }
    }

    //get all book student records for a particular student, i.e. the books issued to him
    public List<BookStudent> getBookStudentByStudentId(Integer id){
        return bookStudentDAO.findBookStudentByStudent(id);
    }

    //to get all book student records by the book, i.e. who it will be issued to in the future
    public List<BookStudent> getBookStudentByBookId(Integer id){
        return bookStudentDAO.findBookStudentByBook(id);
    }

    //to get all records of books issued
    public List<BookStudent> getAllBookStudents(){
        return bookStudentDAO.findAllBookStudent();
    }

    // to add a new book issue record, thorws error if student not found
    public BookStudent addNewBookStudentPair(BookStudent bookStudent)throws StudentNotFoundException {
        Integer st = bookStudent.getStudent().getId();
        Student student1 = this.studentDAO.getStudentById(st);
        if(student1==null) {
            throw new StudentNotFoundException();
        }
        return bookStudentDAO.makeBookStudent(bookStudent);
    }

    //to delete a record by id, throws exception if not found
    public BookStudent deleteById(Integer id) throws BookStudentNotFound{
        BookStudent bs = bookStudentDAO.findBookStudentById(id);
        if(bs==null){
            throw new BookStudentNotFound();
        }else {
            return bookStudentDAO.deleteBookStudentById(id);
        }
    }


    public Boolean doesRequestOverlap(Request request){
        return this.bookStudentDAO.checkOverlap(request);
    }
}
