package com.library.library.entity;

import jakarta.persistence.*;

import java.util.Date;

public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private int slno;

    @JoinColumn()
    private int student_id;

    @JoinColumn()
    private int book_code;

    @Column(name = "")
    private Date start_date;
    
    @Column(name = "")
    private Date end_date;

}
