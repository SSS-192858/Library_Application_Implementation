package com.library.library.service;

import com.library.library.dao.RequestDAO;
import com.library.library.entity.Request;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private RequestDAO requestDAO;

    @Autowired
    public RequestService(RequestDAO requestDAO)
    {
        this.requestDAO = requestDAO;
    }

    @Transactional
    public void saveRequest(Request request)
    {
        this.requestDAO.saveRequest(request);
    }

    @Transactional
    public Request deleteRequestbyId(int theID) {
        return this.requestDAO.deleteRequestById(theID);
    }

    public List<Request> findAllRequests()
    {
        return this.requestDAO.findAllRequests();
    }

    public Request getRequestbyID(int theID)
    {
        return this.requestDAO.getRequestById(theID);
    }

    public List<Request> getRequestbyStudentID(int studentID) {
        return this.requestDAO.getRequestByStudentId(studentID);
    }

    public List<Request> getRequestsByBookCode(int bookCode){
        return this.requestDAO.getRequestByBookId(bookCode);
    }

}
