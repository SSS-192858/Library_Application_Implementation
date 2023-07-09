package com.library.library.controller;

import com.library.library.config.JwtTokenUtil;
import com.library.library.entity.Student;
import com.library.library.entity.User;
import com.library.library.service.JwtUserDetailsService;
import com.library.library.service.StudentService;
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

    //endpoint to delete the student,
    @DeleteMapping("/deleteStudent/{student_id}")
    public Student deleteStudentByID(@PathVariable int student_id) {
        Student tempStudent = this.studentService.findStudentById(student_id);
        return this.studentService.deleteStudent(student_id);
    }

    //endpoint to update the student records, the user object is extracted from the token, and then assigned
    @PutMapping("/updateStudent")
    public Student updateStudent(@RequestBody Student student, @RequestHeader String Authorization)
    {
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        student.setUser(user);
        return this.studentService.updateStudent(student);
    }

    //endpoint to get all the student records
    @GetMapping("/getAll")
    public List<Student> findAll()
    {
        return this.studentService.findAll();
    }

    //endpoint to get student record by using student id
    @GetMapping("/getStudent/{student_id}")
    public Student findStudentByID(@PathVariable int student_id)
    {
        return this.studentService.findStudentById(student_id);
    }

    //endpoint to save a student, the user object is assigned using the token
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

    //endpoint to get the student details using user id, which is extracted from the token
    @GetMapping("/user/getStudent")
    public Student getByUserId(@RequestHeader String Authorization){
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        Student student = studentService.getByUserId(user.getId());
        return studentService.getByUserId(user.getId());
    }

}
