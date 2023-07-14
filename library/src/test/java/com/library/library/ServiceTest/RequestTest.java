package com.library.library.ServiceTest;

import com.library.library.dao.RequestDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.Book;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.exception.RequestNotFoundException;
import com.library.library.exception.StudentNotFoundException;
import com.library.library.service.RequestService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RequestTest {

    @Mock
    private RequestDAO requestDAO;

    @Mock
    private StudentDAO studentDAO;

    @Autowired
    @InjectMocks
    private RequestService requestService;

    private Request request;
    private List<Request> requests;
    private Book book;
    private Student student;

    @BeforeEach
    public void setUp(){
        requests = new ArrayList<>();
        request = new Request();
        book = new Book(1, "Title 1", "Author 1", "Desc 1");
        student = new Student("test1","test1@gmail.com","99999999999");
        student.setId(1);
        request.setStartDate(new Timestamp(System.currentTimeMillis()));
        request.setEndDate(new Timestamp(System.currentTimeMillis()));
        request.setStudent(student);
        request.setBook(book);
        request.setSlno(1);
    }

    @AfterEach
    public void tearDown(){
        request = null;
        book = null;
        student = null;
        requests = null;
    }

    @Test
    public void givenRequestToAddShouldReturnAddedRequest(){
        when(studentDAO.getStudentById(1)).thenReturn(student);
        when(requestDAO.saveRequest(any())).thenReturn(request);

        Request newRequest = requestService.saveRequest(request);
        assertThat(newRequest).isEqualTo(request);
        verify(requestDAO, times(1)).saveRequest(any());
    }

    @Test
    public void givenGetAllRequestsShouldReturnListOfAllRequests(){
        when(requestDAO.findAllRequests()).thenReturn(requests);

        List<Request> requestList = this.requestService.findAllRequests();
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).findAllRequests();
    }

    @Test
    public void givenGetAllRequestsByBooksShouldReturnListOfAllRequestsOfTheBook(){
        when(requestDAO.getRequestByBookId(1)).thenReturn(requests);

        List<Request> requestList = this.requestService.getRequestsByBookCode(1);
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).getRequestByBookId(1);
    }

    @Test
    public void givenGetAllRequestsByStudentShouldReturnListOfAllRequestsOfStudent(){
        when(requestDAO.getRequestByStudentId(1)).thenReturn(requests);

        List<Request> requestList = this.requestService.getRequestbyStudentID(1);
        assertThat(requestList).isEqualTo(requests);
        verify(requestDAO, times(1)).getRequestByStudentId(1);
    }

    @Test
    public void givenIdWillReturnRequest(){
        when(requestDAO.getRequestById(1)).thenReturn(request);

        Request request1 = this.requestService.getRequestbyID(1);
        assertThat(request1).isEqualTo(request);
        verify(requestDAO, times(1)).getRequestById(1);
    }

    @Test
    public void GivenIdWillDeleteRequest(){
        when(requestDAO.getRequestById(1)).thenReturn(request);
        when(requestDAO.deleteRequestById(1)).thenReturn(request);

        Request newRequest = this.requestService.deleteRequestbyId(1);
        assertThat(newRequest).isEqualTo(request);
        verify(requestDAO, times(1)).deleteRequestById(1);
    }

    @Test
    public void GivenRequestOrStudentNullWillThrowException(){
        when(requestDAO.getRequestById(1)).thenReturn(null);
        when(studentDAO.getStudentById(1)).thenReturn(null);

        assertThrows(RequestNotFoundException.class, () -> requestService.getRequestbyID(1));
        assertThrows(RequestNotFoundException.class, () -> requestService.deleteRequestbyId(1));
        assertThrows(StudentNotFoundException.class, () -> requestService.saveRequest(request));
        verify(requestDAO, never()).saveRequest(any());
        verify(requestDAO, never()).deleteRequestById(1);
        verify(requestDAO, times(2)).getRequestById(1);
        verify(studentDAO, times(1)).getStudentById(1);
    }

}
