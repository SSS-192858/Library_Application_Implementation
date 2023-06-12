package com.library.library.dao;

import com.library.library.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends CrudRepository<Role, Integer> {
    Role findRoleByName(String name);
}
