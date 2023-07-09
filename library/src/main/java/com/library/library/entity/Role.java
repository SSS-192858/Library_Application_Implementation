package com.library.library.entity;

import jakarta.persistence.*;


@Entity
// role entity
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "role_id")
//    id no for that role.
    private long id;

    @Column(name = "role_name")
//    name of the role.
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

