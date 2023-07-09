package com.library.library.dao;

import com.library.library.entity.Request;

import java.util.List;

// DAO to access and update values from the request table in the database
public interface RequestDAO {
    public Request saveRequest(Request request);

    public Request deleteRequestById(Integer id);

    public List<Request> findAllRequests();

    public Request getRequestById(Integer id);

    public List<Request> getRequestByStudentId(Integer id);

    public List<Request> getRequestByBookId(Integer id);
}
