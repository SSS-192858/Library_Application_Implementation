package com.library.library.service;

import com.library.library.dao.RequestDAO;
import com.library.library.dao.StudentDAO;
import com.library.library.entity.Request;
import com.library.library.entity.Student;
import com.library.library.exception.RequestNotFoundException;
import com.library.library.exception.StudentNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private RequestDAO requestDAO;
    private StudentDAO studentDAO;

    @Autowired
    public RequestService(RequestDAO requestDAO,StudentDAO studentDAO)
    {
        this.requestDAO = requestDAO;
        this.studentDAO = studentDAO;
    }

    @Transactional
    public Request saveRequest(Request request) throws StudentNotFoundException
    {
        Integer id = request.getStudent().getId();
        Student st = this.studentDAO.getStudentById(id);
        if(st==null)
        {
            throw new StudentNotFoundException();
        }
        return this.requestDAO.saveRequest(request);
    }

    @Transactional
    public Request deleteRequestbyId(int theID) throws RequestNotFoundException{
        Request request = requestDAO.getRequestById(theID);
        if (request == null){
            throw new RequestNotFoundException();
        }else{
            return this.requestDAO.deleteRequestById(theID);
        }
    }

    public List<Request> findAllRequests()
    {
        return this.requestDAO.findAllRequests();
    }

    public Request getRequestbyID(int theID) throws RequestNotFoundException {
        Request request = requestDAO.getRequestById(theID);
        if (request == null){
            throw new RequestNotFoundException();
        }
        return this.requestDAO.getRequestById(theID);
    }

    public List<Request> getRequestbyStudentID(int studentID) {
        return this.requestDAO.getRequestByStudentId(studentID);
    }

    public List<Request> getRequestsByBookCode(int bookCode){
        return this.requestDAO.getRequestByBookId(bookCode);
    }

}
