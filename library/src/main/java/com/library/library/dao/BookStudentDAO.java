package com.library.library.dao;

import com.library.library.entity.Book;
import java.util.List;
import com.library.library.entity.BookStudent;
import org.springframework.data.repository.CrudRepository;

public interface BookStudentDAO {

    public void deleteRequestById(int id);

    public void makeRequest(BookStudent bookStudent);

    public List<BookStudent> findAllBookRequest();

    public List<BookStudent> findRequestbyStudent(int student_id);

    public List<BookStudent> findRequestbyBook(int book_code);

    public BookStudent findRequestById(int id);
}
