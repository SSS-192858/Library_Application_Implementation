package com.library.library.dao;

import com.library.library.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentDAO extends CrudRepository<Student, Long> {
    Student findStudentByName(String name);
}
