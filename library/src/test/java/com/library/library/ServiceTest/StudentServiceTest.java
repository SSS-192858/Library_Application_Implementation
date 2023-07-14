package com.library.library.ServiceTest;

import com.library.library.dao.BookDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.Student;
import com.library.library.service.StudentService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {
    @Mock
    private StudentDAO studentDAO;

    @Autowired
    @InjectMocks
    private StudentService studentService;

    private Student student;
    private List<Student> studentList;

    @BeforeEach
    public void setUp()
    {
        studentList = new ArrayList<>();
        this.student = new Student("test1","test1@gmail.com","99999999999");
        this.student.setId(1);
    }

    @AfterEach
    public void tearDown()
    {
        this.student = null;
        this.studentList = null;
    }

    @Test
    public void givenStudentToAddShouldReturnAddedStudent(){
        when(this.studentDAO.saveStudent(any())).thenReturn(this.student);
        this.studentService.saveStudent(this.student);
        verify(studentDAO,times(1)).saveStudent(any());
    }

}
