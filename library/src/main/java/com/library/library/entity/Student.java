package com.library.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "")
public class Student {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "")
    private User user;

    @Column(name = "")
    private String studentName;

    @Column(name = "")
    private String email;

    @Column(name = "")
    private String phone;

    public Student(String studentName, String email, String phone) {
        this.studentName = studentName;
        this.email = email;
        this.phone = phone;
    }

    public Student (){

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}

