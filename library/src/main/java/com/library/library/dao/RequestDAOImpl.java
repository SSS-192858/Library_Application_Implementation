package com.library.library.dao;

import com.library.library.entity.Request;
import com.library.library.entity.Student;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RequestDAOImpl implements RequestDAO {

    private EntityManager entityManager ;

    @Autowired
    public RequestDAOImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }
    @Override
    public void saveRequest(Request request) {
        entityManager.persist(request);
    }

    @Override
    public void deleteRequestById(Integer id) {
        Request request = entityManager.find(Request.class, id);
        if(request == null)
        {
            System.out.println("Not found");
            return;
        }
        entityManager.remove(request);
    }

    @Override
    public List<Request> findAllStudents() {
        return null;
    }

    @Override
    public Request getRequestById(Integer id) {
        return null;
    }

    @Override
    public List<Request> getRequestByStudentId(Integer id) {
        return null;
    }
}
