package com.library.library.service;

import com.library.library.dao.StudentDAO;
import com.library.library.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.List;

public class StudentService {
    @Autowired
    private StudentDAO studentDAO;

    public Student findStudentById(Integer id){
        return studentDAO.getStudentById(id);
    }

    public List<Student> findAll(){
        return studentDAO.findAllStudents();
    }

    public void saveStudent(Student student){
        studentDAO.saveStudent(student);
    }

    public void deleteStudent(Integer id){
        studentDAO.deleteStudentById(id);
    }

    public void updateStudent(Student student){
        studentDAO.updateStudent(student);
    }
}
