package com.library.library.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "student_book")
public class BookStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slno")
    private int slno;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "book_code")
    private Book book;
    @Column(name="start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;


    public Date getEndDate() {
        return endDate;
    }

    public Date getStartDate() {
        return startDate;
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

    public void setEndDate(Date end_date) {
        this.endDate = end_date;
    }

    public void setSlno(int slno) {
        this.slno = slno;
    }

    @Override
    public String toString() {
        return "BookStudent{" +
                "slno=" + slno +
                ", student=" + student +
                ", book=" + book +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }

    public void setStartDate(Date start_date) {
        this.startDate = start_date;
    }
}

