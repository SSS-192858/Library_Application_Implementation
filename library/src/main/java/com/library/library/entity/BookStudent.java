package com.library.library.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class BookStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private int slno;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "book_code")
    private Book book;

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

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
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

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }
}

