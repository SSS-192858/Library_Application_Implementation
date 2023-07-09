package com.library.library.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
// request entity that will be used to map to request table.
@Table(name = "request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slno")
//    serial number for the request
    private int slno;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "student_id")
//    the student who is request the book.
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "book_code")
//    the book that is being requested.
    private Book book;

    @Column(name = "start_date")
//    start date for the request.
    private Date startDate;

// end date for the request.
    @Column(name = "end_date")
    private Date endDate;

    public int getSlno() {
        return slno;
    }

    public void setSlno(int slno) {
        this.slno = slno;
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


    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date start_date) {
        this.startDate = start_date;
    }

    public Date getEndDate() {
        return endDate;
    }

    @Override
    public String toString() {
        return "Request{" +
                "slno=" + slno +
                ", student=" + student +
                ", book=" + book +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }

    public void setEndDate(Date end_date) {
        this.endDate = end_date;
    }

}
