package com.library.library.dao;

import com.library.library.entity.Student;
import org.springframework.stereotype.Repository;

import java.util.List;

// DAO to access and update values from the student table in the database
@Repository
public interface StudentDAO {
    public Student saveStudent(Student student);

    public Student deleteStudentById(Integer id);

    public Student updateStudent(Student student);

    public List<Student> findAllStudents();

    public Student getStudentById(Integer id);

    public Student getStudentByUserId(Integer id);
}
