package com.library.library.service;

import com.library.library.dao.StudentDAO;
import com.library.library.dao.UserDAO;
import com.library.library.entity.Student;
import com.library.library.entity.User;
import com.library.library.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private StudentDAO studentDAO;
    private UserDAO userDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO, UserDAO userDAO) {
        this.studentDAO = studentDAO;
        this.userDAO = userDAO;
    }

    //method to find student records by the student id, thorws exception if not found
    public Student findStudentById(Integer id) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(id);
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return student1;
    }

    //method to get all the student records registered with the library
    public List<Student> findAll(){
        return studentDAO.findAllStudents();
    }

    //to add a student record
    public Student saveStudent(Student student){
        return studentDAO.saveStudent(student);
    }

    //to delete a student record, and subsequently delete the user record for the student as well
    public Student deleteStudent(Integer id) throws StudentNotFoundException{
        Student s = this.studentDAO.getStudentById(id);
        if(s == null){
            throw new StudentNotFoundException();
        }
        User user = s.getUser();
        Student s1 = studentDAO.deleteStudentById(id);
        userDAO.delete(user);
        return s1;
    }

    //to update the record of the particular student, throws exception if not found
    public Student updateStudent(Student student) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(student.getId());
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return studentDAO.updateStudent(student);
    }

    //to get student record by USER ID
    public Student getByUserId(Integer id) {
        return studentDAO.getStudentByUserId(id);
    }
}
