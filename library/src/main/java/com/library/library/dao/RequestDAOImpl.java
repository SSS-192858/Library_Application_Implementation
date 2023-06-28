package com.library.library.dao;

import com.library.library.entity.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RequestDAOImpl implements RequestDAO {

    private EntityManager entityManager;

    @Autowired
    public RequestDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Request saveRequest(Request request) {
        return entityManager.merge(request);
    }

    @Override
    public Request deleteRequestById(Integer id) {
        Request request = entityManager.find(Request.class, id);
        if (request == null) {
            System.out.println("Not found");
            return null;
        }
        entityManager.remove(request);
        return request;
    }

    @Override
    public List<Request> findAllRequests() {
        TypedQuery<Request> query = entityManager.createQuery("from Request", Request.class);
        return query.getResultList();
    }

    @Override
    public Request getRequestById(Integer id) {
        return this.entityManager.find(Request.class, id);
    }

    @Override
    public List<Request> getRequestByStudentId(Integer id) {
        TypedQuery<Request> tpq = this.entityManager.createQuery("FROM Request where student.id = :student_id", Request.class);
        tpq.setParameter("student_id", id);
        return tpq.getResultList();
    }

    @Override
    public List<Request> getRequestByBookId(Integer id) {
        TypedQuery<Request> tpq = this.entityManager.createQuery("FROM Request where book.bookCode = :code", Request.class);
        tpq.setParameter("code", id);
        return tpq.getResultList();
    }
}