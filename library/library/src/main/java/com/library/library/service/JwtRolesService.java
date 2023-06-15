package com.library.library.service;

import com.library.library.dao.RoleDAO;
import com.library.library.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtRolesService {
    @Autowired
    private RoleDAO roleDAO;

    public Role findByName(String name) {
        return roleDAO.findRoleByName(name);
    }
}