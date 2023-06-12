package com.library.library.dao;

import com.library.library.entity.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RequestDAO {
    public void saveRequest(Request request);

    public void deleteRequestById(Integer id);

    public List<Request> findAllStudents();

    public Request getRequestById(Integer id);

    public List<Request> getRequestByStudentId(Integer id);
}
