package com.library.library.controller;

import com.library.library.config.JwtTokenUtil;
import com.library.library.entity.Student;
import com.library.library.entity.User;
import com.library.library.service.JwtUserDetailsService;
import com.library.library.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

    private StudentService studentService;
    private JwtUserDetailsService jwtUserDetailsService;

    private JwtTokenUtil jwtTokenUtil;

    public StudentController(StudentService studentService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil)
    {
        this.studentService = studentService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @DeleteMapping("/deleteStudent/{student_id}")
    public Student deleteStudentByID(@PathVariable int student_id)
    {
        Student tempEmployee = this.studentService.findStudentById(student_id);
        if(tempEmployee==null)
        {
            throw new RuntimeException("Student id not found "+student_id);
        }
        return this.studentService.deleteStudent(student_id);
    }

    @PutMapping("/updateStudent")
    public Student updateStudent(@RequestBody Student student, @RequestHeader String Authorization)
    {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        student.setUser(user);
        return this.studentService.updateStudent(student);
    }

    @GetMapping("/getAll")
    public List<Student> findAll()
    {
        return this.studentService.findAll();
    }

    @GetMapping("/getStudent/{student_id}")
    public Student findStudentByID(@PathVariable int student_id)
    {
        return this.studentService.findStudentById(student_id);
    }

    @PostMapping("/save")
    public Student saveStudent(@RequestBody Student student, @RequestHeader String Authorization)
    {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        student.setId(0);
        student.setUser(user);
        this.studentService.saveStudent(student);
        return student;
    }

    @GetMapping("/user/getStudent")
    public Student getByUserId(@RequestHeader String Authorization){
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Student student = studentService.getByUserId(user.getId());
        return studentService.getByUserId(user.getId());
    }

}
