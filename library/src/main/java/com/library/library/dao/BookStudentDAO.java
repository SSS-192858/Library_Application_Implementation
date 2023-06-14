package com.library.library.dao;

import com.library.library.entity.Book;
import java.util.List;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import org.springframework.data.repository.CrudRepository;

public interface BookStudentDAO {

    public void deleteBookStudentById(int id);

    public void makeBookStudent(BookStudent bookStudent);

    public List<BookStudent> findAllBookStudent();

    public List<BookStudent> findBookStudentByStudent(int student_id);

    public List<BookStudent> findBookStudentByBook(int book_code);

    public BookStudent findBookStudentById(int id);
}