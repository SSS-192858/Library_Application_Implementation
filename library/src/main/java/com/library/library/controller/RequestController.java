package com.library.library.controller;

import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import com.library.library.exception.UnavailableForGivenDatesException;
import com.library.library.service.BookStudentService;
import com.library.library.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {

    private RequestService requestService;
    private BookStudentService bookStudentService;

    public RequestController(RequestService requestService, BookStudentService bookStudentService){
        this.requestService = requestService;
        this.bookStudentService = bookStudentService;
    }

    @GetMapping("/requests/allRequests")
    public List<Request> getAllRequests(){
        return requestService.findAllRequests();
    }

    @GetMapping("/requests/student/{id}")
    public List<Request> getAllRequestsByStudentId(@PathVariable Integer id){
        return requestService.getRequestbyStudentID(id);
    }

    @GetMapping("/requests/{id}")
    public Request getRequestById(@PathVariable Integer id){
        return requestService.getRequestbyID(id);
    }

    @GetMapping("/requests/book/{id}")
    public List<Request> getAllRequestsByBookCode(@PathVariable Integer id){
        return requestService.getRequestsByBookCode(id);
    }

    @PostMapping("/requests/save")
    public void saveRequest(@RequestBody Request request){
        request.setSlno(0);
        requestService.saveRequest(request);
    }

    @DeleteMapping("/requests/delete/{id}")
    public Request deleteRequest(@PathVariable Integer id){
        return requestService.deleteRequestbyId(id);
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
    public void saveBookStudent(@RequestBody BookStudent bookStudent){
        bookStudent.setSlno(0);
        bookStudentService.addNewBookStudentPair(bookStudent);
    }

    @DeleteMapping("/bookStudent/delete/{id}")
    public void deleteBookStudentById(@PathVariable Integer id){
        this.bookStudentService.deleteById(id);
    }

    @PostMapping("/bookStudent/accept")
    public void accept(@RequestBody Request request){
        deleteRequest(request.getSlno());
        if(bookStudentService.doesRequestOverlap(request)){
            throw new UnavailableForGivenDatesException();
        }else{
            BookStudent bs = new BookStudent();
            bs.setEnd_date(request.getEnd_date());
            bs.setStart_date(request.getStart_date());
            bs.setBook(request.getBook());
            bs.setStudent(request.getStudent());
            saveBookStudent(bs);
        }
    }
}
