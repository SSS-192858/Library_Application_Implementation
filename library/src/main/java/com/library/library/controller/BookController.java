package com.library.library.controller;

import com.library.library.entity.Book;
import com.library.library.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/getAll")
    public List<Book> getBooks(){
        return bookService.findAllBooks();
    }

    @GetMapping("/getBook/{book_code}")
    public Book getBookById(@PathVariable Integer book_code){
        return bookService.findBookByCode(book_code);
    }

    @PostMapping("/save")
    public Book saveBook(@RequestBody Book book){
        book.setBookCode(0);
        return bookService.addBook(book);
    }

    @PutMapping("/updateBook")
    public Book updateBook(@RequestBody Book book){
        bookService.updateBook(book);
        return book;
    }

    @DeleteMapping("/deleteBook/{book_code}")
    public Book deleteBook(@PathVariable Integer book_code){
        return bookService.deleteBookByCode(book_code);
    }
}
