package com.library.library.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class BookStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private int slno;

    @JoinColumn()
    private int student_id;

    @JoinColumn()
    private int book_code;

    @Column(name="")
    private Date start_date;

    @Column(name = "")
    private Date end_date;


    public Date getEnd_date() {
        return end_date;
    }

    public Date getStart_date() {
        return start_date;
    }

    public int getBook_code() {
        return book_code;
    }

    public void setBook_code(int book_code) {
        this.book_code = book_code;
    }

    public int getStudent_id() {
        return student_id;
    }

    public int getSlno() {
        return slno;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public void setSlno(int slno) {
        this.slno = slno;
    }

    public void setStudent_id(int student_id) {
        this.student_id = student_id;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }
}

