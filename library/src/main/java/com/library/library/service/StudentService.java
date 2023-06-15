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

    public void saveStudent(Student student){
        studentDAO.saveStudent(student);
    }

    public void deleteStudent(Integer id){
        studentDAO.deleteStudentById(id);
    }

    public Student updateStudent(Student student) throws StudentNotFoundException{
        Student student1 = this.studentDAO.getStudentById(student.getId());
        if (student1 == null){
            throw new StudentNotFoundException();
        }
        return studentDAO.updateStudent(student);
    }
}
