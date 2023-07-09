package com.library.library.dao;

import com.library.library.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO{

    private EntityManager entityManager;

    @Autowired
    public StudentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    // save a new student record
    @Override
    @Transactional
    public Student saveStudent(Student student) {
        return entityManager.merge(student);
    }

    // delete a student
    @Override
    @Transactional
    public Student deleteStudentById(Integer id) {
        Student student = entityManager.find(Student.class, id);
        if(student == null)
        {
            System.out.println("Not found");
            return null;
        }
        entityManager.remove(student);
        return student;
    }

    // update records of existing student
    @Override
    @Transactional
    public Student updateStudent(Student student) {
        return entityManager.merge(student);
    }

    // get all student records
    @Override
    public List<Student> findAllStudents() {
        TypedQuery<Student> query = entityManager.createQuery("from Student", Student.class);
        return query.getResultList();
    }

    // get a particular student by their id
    @Override
    public Student getStudentById(Integer id) {
        return entityManager.find(Student.class, id);
    }

    // getting a student's personal information, extracted from jwt token
    // allows a student to update their own info
    @Override
    public Student getStudentByUserId(Integer id) {
        TypedQuery<Student> query = this.entityManager.createQuery("FROM Student where user.id = :id", Student.class);
        query.setParameter("id", id);
        return query.getSingleResult();
    }

}
