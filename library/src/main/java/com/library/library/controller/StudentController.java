package com.library.library.controller;

import com.library.library.entity.Student;
import com.library.library.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/student")
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService)
    {
        this.studentService = studentService;
    }

    @DeleteMapping("/deleteStudent/{student_id}")
    public void deleteStudentbyID(@PathVariable int student_id)
    {
        Student tempEmployee = this.studentService.findStudentById(student_id);
        if(tempEmployee==null)
        {
            throw new RuntimeException("Employee id not found"+student_id);
        }
        this.studentService.deleteStudent(student_id);
    }

    @PutMapping("/updateStudent")
    public void updateStudent(@RequestBody Student student)
    {
        this.studentService.updateStudent(student);
    }

    @GetMapping("/getAll")
    public List<Student> findAll()
    {
        return this.studentService.findAll();

    }

    @GetMapping("/getStudent/{student_id}")
    public Student findStudentbyID(@PathVariable int student_id)
    {
        return this.studentService.findStudentById(student_id);

    }

    @PostMapping("/save")
    public void saveStudent(@RequestBody Student student)
    {
        student.setId(0);
        this.studentService.saveStudent(student);
    }

}
