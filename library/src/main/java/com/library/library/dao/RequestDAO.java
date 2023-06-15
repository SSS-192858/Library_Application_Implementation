package com.library.library.dao;

import com.library.library.entity.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RequestDAO {
    public Request saveRequest(Request request);

    public Request deleteRequestById(Integer id);

    public List<Request> findAllRequests();

    public Request getRequestById(Integer id);

    public List<Request> getRequestByStudentId(Integer id);

    public List<Request> getRequestByBookId(Integer id);
}
