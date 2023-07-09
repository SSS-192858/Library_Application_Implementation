package com.library.library.dao;

import com.library.library.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// table stores the roles of users (admin/student etc)
@Repository
public interface RoleDAO extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}
