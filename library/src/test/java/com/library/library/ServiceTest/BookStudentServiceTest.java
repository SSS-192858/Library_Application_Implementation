package com.library.library.ServiceTest;

import com.library.library.dao.BookStudentDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.Book;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.exception.BookStudentNotFound;
import com.library.library.exception.StudentNotFoundException;
import com.library.library.service.BookStudentService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class BookStudentServiceTest {
    @Mock
    private BookStudentDAO bookStudentDAO;

    @Mock
    private StudentDAO studentDAO;

    @Autowired
    @InjectMocks
    private BookStudentService bookStudentService;

    private BookStudent bookStudent;
    private List<BookStudent> bookStudents;
    private Book book;
    private Student student;

    @BeforeEach
    public void setUp(){
        bookStudents = new ArrayList<>();
        bookStudent = new BookStudent();
        book = new Book(1, "Title 1", "Author 1", "Desc 1");
        student = new Student("test1","test1@gmail.com","99999999999");
        student.setId(1);
        bookStudent.setStartDate(new Timestamp(System.currentTimeMillis()));
        bookStudent.setEndDate(new Timestamp(System.currentTimeMillis()));
        bookStudent.setStudent(student);
        bookStudent.setBook(book);
        bookStudent.setSlno(1);
    }

    @AfterEach
    public void tearDown(){
        bookStudent = null;
        book = null;
        student = null;
        bookStudents = null;
    }

    @Test
    public void givenBookStudentToAddShouldReturnAddedBookStudent(){
        when(studentDAO.getStudentById(1)).thenReturn(student);
        when(bookStudentDAO.makeBookStudent(any())).thenReturn(bookStudent);

        BookStudent newBookStudent = bookStudentService.addNewBookStudentPair(bookStudent);
        assertThat(newBookStudent).isEqualTo(bookStudent);
        verify(bookStudentDAO, times(1)).makeBookStudent(any());
    }

    @Test
    public void givenGetAllBookStudentsShouldReturnListOfAllBookStudents(){
        when(bookStudentDAO.findAllBookStudent()).thenReturn(bookStudents);

        List<BookStudent> bookStudentList = this.bookStudentService.getAllBookStudents();
        assertThat(bookStudentList).isEqualTo(bookStudents);
        verify(bookStudentDAO, times(1)).findAllBookStudent();
    }

    @Test
    public void givenGetAllBookStudentsByBooksShouldReturnListOfAllBookStudentsOfTheBook(){
        when(bookStudentDAO.findBookStudentByBook(1)).thenReturn(bookStudents);

        List<BookStudent> bookStudentList = this.bookStudentService.getBookStudentByBookId(1);
        assertThat(bookStudentList).isEqualTo(bookStudents);
        verify(bookStudentDAO, times(1)).findBookStudentByBook(1);
    }

    @Test
    public void givenGetAllBookStudentsByStudentShouldReturnListOfAllBookStudentsOfStudent(){
        when(bookStudentDAO.findBookStudentByStudent(1)).thenReturn(bookStudents);

        List<BookStudent> bookStudentList = this.bookStudentService.getBookStudentByStudentId(1);
        assertThat(bookStudentList).isEqualTo(bookStudents);
        verify(bookStudentDAO, times(1)).findBookStudentByStudent(1);
    }

    @Test
    public void givenIdWillReturnBookStudent(){
        when(bookStudentDAO.findBookStudentById(1)).thenReturn(bookStudent);

        BookStudent bookStudent1 = this.bookStudentService.getBookStudentById(1);
        assertThat(bookStudent1).isEqualTo(bookStudent);
        verify(bookStudentDAO, times(1)).findBookStudentById(1);
    }

    @Test
    public void GivenIdWillDeleteBookStudent(){
        when(bookStudentDAO.findBookStudentById(1)).thenReturn(bookStudent);
        when(bookStudentDAO.deleteBookStudentById(1)).thenReturn(bookStudent);

        BookStudent newBookStudent = this.bookStudentService.deleteById(1);
        assertThat(newBookStudent).isEqualTo(bookStudent);
        verify(bookStudentDAO, times(1)).deleteBookStudentById(1);
    }

    @Test
    public void GivenBookStudentOrStudentNullWillThrowException(){
        when(bookStudentDAO.findBookStudentById(1)).thenReturn(null);
        when(studentDAO.getStudentById(1)).thenReturn(null);

        assertThrows(BookStudentNotFound.class, () -> bookStudentService.getBookStudentById(1));
        assertThrows(BookStudentNotFound.class, () -> bookStudentService.deleteById(1));
        assertThrows(StudentNotFoundException.class, () -> bookStudentService.addNewBookStudentPair(bookStudent));
        verify(bookStudentDAO, never()).makeBookStudent(any());
        verify(bookStudentDAO, never()).deleteBookStudentById(1);
        verify(bookStudentDAO, times(2)).findBookStudentById(1);
        verify(studentDAO, times(1)).getStudentById(1);
    }

    @Test
    public void GivenOverlapWillAssertTrue(){
        when(bookStudentDAO.checkOverlap(any())).thenReturn(true);

        Request request = new Request();
        assertTrue(bookStudentService.doesRequestOverlap(request));
    }
}
