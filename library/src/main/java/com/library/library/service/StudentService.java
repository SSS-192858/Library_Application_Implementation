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

    public Student findStudentById(Integer id) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(id);
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return student1;
    }

    public List<Student> findAll(){
        return studentDAO.findAllStudents();
    }

    public Student saveStudent(Student student){
        return studentDAO.saveStudent(student);
    }

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

    public Student updateStudent(Student student) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(student.getId());
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return studentDAO.updateStudent(student);
    }

    public Student getByUserId(Integer id) {
        return studentDAO.getStudentByUserId(id);
    }
}
