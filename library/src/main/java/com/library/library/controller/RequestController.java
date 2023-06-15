package com.library.library.controller;

import com.library.library.config.JwtTokenUtil;
import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.entity.User;
import com.library.library.exception.UnavailableForGivenDatesException;
import com.library.library.service.BookStudentService;
import com.library.library.service.JwtUserDetailsService;
import com.library.library.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {

    private RequestService requestService;
    private BookStudentService bookStudentService;

    private JwtUserDetailsService jwtUserDetailsService;

    private JwtTokenUtil jwtTokenUtil;

    public RequestController(RequestService requestService, BookStudentService bookStudentService, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil){
        this.requestService = requestService;
        this.bookStudentService = bookStudentService;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/requests/allRequests")
    public List<Request> getAllRequests(){
        return requestService.findAllRequests();
    }

    @GetMapping("/requests/student/{student_id}")
    public List<Request> getAllRequestsByStudentId(@PathVariable int student_id){
        return requestService.getRequestbyStudentID(student_id);
    }

    @GetMapping("/requests/{id}")
    public Request getRequestById(@PathVariable int id){
        return requestService.getRequestbyID(id);
    }

    @GetMapping("/requests/book/{id}")
    public List<Request> getAllRequestsByBookCode(@PathVariable int id){
        return requestService.getRequestsByBookCode(id);
    }

    @PostMapping("/requests/save")
    public Request saveRequest(@RequestBody Request request, @RequestHeader String Authorization){
        request.setSlno(0);
        String username = jwtTokenUtil.getUsernameFromToken(Authorization.substring(7));
        User user = jwtUserDetailsService.getUserByUsername(username);
        request.getStudent().setUser(user);
        request.getStudent().addRequest(request);
        return requestService.saveRequest(request);
    }

    @DeleteMapping("/requests/delete/{id}")
    public void deleteRequest(@PathVariable Integer id){
        requestService.deleteRequestbyId(id);
    }

    @GetMapping("/bookStudent/getAll")
    public List<BookStudent> getAllBooksOfStudent(){
        return this.bookStudentService.getAllBookStudents();
    }

    @GetMapping("/bookStudent/{id}")
    public BookStudent getBookStudentById(@PathVariable Integer id){
        return bookStudentService.getBookStudentById(id);
    }

    @GetMapping("/bookStudent/student/{id}")
    public List<BookStudent> getBookStudentByStudentId(@PathVariable Integer id){
        return bookStudentService.getBookStudentByStudentId(id);
    }

    @GetMapping("/bookStudent/book/{id}")
    public List<BookStudent> getBookStudentByBookId(@PathVariable Integer id){
        return bookStudentService.getBookStudentByBookId(id);
    }
    
    @PostMapping("/bookStudent/save")
    public BookStudent saveBookStudent(@RequestBody BookStudent bookStudent){
        bookStudent.setSlno(0);
        return bookStudentService.addNewBookStudentPair(bookStudent);
    }

    @DeleteMapping("/bookStudent/delete/{id}")
    public void deleteBookStudentById(@PathVariable Integer id){
        this.bookStudentService.deleteById(id);
    }

    @PostMapping("/bookStudent/accept")
    public BookStudent accept(@RequestBody Request request){
        deleteRequest(request.getSlno());
        if(bookStudentService.doesRequestOverlap(request)){
            throw new UnavailableForGivenDatesException();
        }else{
            BookStudent bs = new BookStudent();
            bs.setEnd_date(request.getEnd_date());
            bs.setStart_date(request.getStart_date());
            bs.setBook(request.getBook());
            bs.setStudent(request.getStudent());
            return saveBookStudent(bs);
        }
    }
}
