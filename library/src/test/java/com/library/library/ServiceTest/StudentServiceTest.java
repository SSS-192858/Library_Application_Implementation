package com.library.library.ServiceTest;

import com.library.library.dao.StudentDAO;
import com.library.library.dao.UserDAO;
import com.library.library.entity.Student;
import com.library.library.exception.StudentNotFoundException;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {
    @Mock
    private StudentDAO studentDAO;

    @Mock
    private UserDAO userDAO;

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
        when(studentDAO.saveStudent(any())).thenReturn(this.student);
        Student student1 = this.studentService.saveStudent(this.student);
        assertThat(student1).isEqualTo(student);
        verify(studentDAO,times(1)).saveStudent(any());
    }

    @Test
    public void givenGetAllStudentsShouldReturnListOfAllStudents(){
        when(studentDAO.findAllStudents()).thenReturn(this.studentList);
        List<Student> students = studentService.findAll();

        assertEquals(students, studentList);
        verify(studentDAO, times(1)).findAllStudents();
    }

    @Test
    public void GivenIdWillReturnStudent(){
        when(studentDAO.getStudentById(1)).thenReturn(student);
        Student newStudent = studentService.findStudentById(1);
        assertThat(newStudent).isEqualTo(student);
    }

    @Test
    public void GivenIdWillDeleteStudent(){
        when(studentDAO.getStudentById(1)).thenReturn(student);
        when(studentDAO.deleteStudentById(1)).thenReturn(student);

        Student newStudent = studentService.deleteStudent(1);
        assertThat(newStudent).isEqualTo(student);
        verify(studentDAO, times(1)).deleteStudentById(1);
        verify(userDAO, times(1)).delete(any());
    }

    @Test
    public void GivenStudentWillUpdateIt() {
        when(studentDAO.getStudentById(1)).thenReturn(student);
        when(studentDAO.updateStudent(any())).thenReturn(student);

        Student newStudent = studentService.updateStudent(student);
        assertThat(newStudent).isEqualTo(student);
        verify(studentDAO, times(1)).updateStudent(student);
    }

    @Test
    public void GivenStudentNullWillThrowException(){
        when(studentDAO.getStudentById(1)).thenReturn(null);

        assertThrows(StudentNotFoundException.class, () -> studentService.findStudentById(1));
        assertThrows(StudentNotFoundException.class, () -> studentService.updateStudent(student));
        assertThrows(StudentNotFoundException.class, () -> studentService.deleteStudent(1));
        verify(studentDAO, never()).updateStudent(any());
        verify(studentDAO, never()).deleteStudentById(1);
        verify(studentDAO, times(3)).getStudentById(1);
    }

    @Test
    public void GivenUserIdWillFindStudent(){
        when(studentDAO.getStudentByUserId(1)).thenReturn(student);
        Student newStudent = studentService.getByUserId(1);
        assertThat(newStudent).isEqualTo(student);
        verify(studentDAO, times(1)).getStudentByUserId(1);
    }
}
