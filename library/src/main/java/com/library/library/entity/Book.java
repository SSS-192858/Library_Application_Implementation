package com.library.library.entity;

import jakarta.persistence.*;

@Entity
// book entity that will be mapped to book table in the database.
@Table(name = "book")
public class Book {

    @Override
    public String toString() {
        return "Book{" +
                "bookCode=" + bookCode +
                ", bookTitle='" + bookTitle + '\'' +
                ", author='" + author + '\'' +
                ", bookDesc='" + bookDesc + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_code")
//    The book identification
    private int bookCode;
//    book name
    @Column(name = "book_title")
    private String bookTitle;
//  author of the book
    @Column(name = "book_author")
    private String author;

//    book description
    @Column(name = "book_desc")
    private String bookDesc;

    public Book() {}

    public Book(int book_code,String book_title,String author,String book_desc)
    {
        this.bookCode = book_code;
        this.bookTitle = book_title;
        this.author = author;
        this.bookDesc = book_desc;
    }

    public int getBookCode()
    {
        return this.bookCode;
    }

    public void setBookCode(int bookCode) {
        this.bookCode = bookCode;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setBookDesc(String bookDesc) {
        this.bookDesc = bookDesc;
    }

    public String getBookTitle()
    {
        return this.bookTitle;
    }
    public String getAuthor()
    {
        return this.author;
    }
    public String getBookDesc() {
        return this.bookDesc;
    }
}
