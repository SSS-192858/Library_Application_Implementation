package com.library.library.service;

import com.library.library.dao.StudentDAO;
import com.library.library.entity.Student;
import com.library.library.exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    private StudentDAO studentDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
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
        return studentDAO.deleteStudentById(id);
    }

    public Student updateStudent(Student student) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(student.getId());
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return studentDAO.updateStudent(student);
    }
}
