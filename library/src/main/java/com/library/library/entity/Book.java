package com.library.library.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JoinColumnOrFormula;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private int book_code;

    @Column(name = "")
    private String book_title;

    @Column(name = "")
    private String author;

    @Column(name = "")
    private String book_desc;

    public Book() {}

    public Book(int book_code,String book_title,String author,String book_desc)
    {
        this.book_code = book_code;
        this.book_title = book_title;
        this.author = author;
        this.book_desc =book_desc;
    }

    public int getBook_code()
    {
        return this.book_code;
    }

    public String getBook_title()
    {
        return this.book_title;
    }
    public String getAuthor()
    {
        return this.author;
    }
    public String getBook_desc() {
        return this.book_desc;
    }
}
