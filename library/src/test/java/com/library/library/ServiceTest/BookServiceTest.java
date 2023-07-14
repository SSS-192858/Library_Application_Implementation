package com.library.library.ServiceTest;

import com.library.library.dao.BookDAO;
import com.library.library.entity.Book;
import com.library.library.exception.BookNotFoundException;
import com.library.library.service.BookService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

    @Mock
    private BookDAO bookDAO;

    @Autowired
    @InjectMocks
    private BookService bookService;

    private Book book1;
    private List<Book> books;

    @BeforeEach
    public void setUp(){
        books = new ArrayList<>();
        book1 = new Book(1, "Title 1", "Author 1", "Desc 1");
    }

    @AfterEach
    public void tearDown(){
        book1 = null;
        books = null;
    }

    @Test
    public void givenBookToAddShouldReturnAddedBook(){
        when(bookDAO.saveBook(any())).thenReturn(book1);
        Book book = bookService.addBook(book1);
        assertThat(book).isEqualTo(book1);
        verify(bookDAO, times(1)).saveBook(any());
    }

    @Test
    public void GivenGetAllBooksShouldReturnListOfAllBooks(){

        when(bookDAO.findAllbooks()).thenReturn(books);
        List<Book> bookList = bookService.findAllBooks();

        assertEquals(books,bookList);
        verify(bookDAO,times(1)).findAllbooks();
    }

    @Test
    public void GivenIdWillReturnBook(){
        when(bookDAO.findBookById(1)).thenReturn(book1);

        Book newBook = bookService.findBookByCode(1);
        assertThat(newBook).isEqualTo(book1);
    }

    @Test
    public void GivenIdWillDeleteBook(){
        when(bookDAO.findBookById(1)).thenReturn(book1);
        when(bookDAO.deleteById(1)).thenReturn(book1);

        Book newBook = bookService.deleteBookByCode(1);
        assertThat(newBook).isEqualTo(book1);
        verify(bookDAO, times(1)).deleteById(1);
    }

    @Test
    public void GivenBookWillUpdateIt() {
        when(bookDAO.findBookById(1)).thenReturn(book1);
        when(bookDAO.updateBook(any())).thenReturn(book1);

        Book newBook = bookService.updateBook(book1);
        assertThat(newBook).isEqualTo(book1);
        verify(bookDAO, times(1)).updateBook(book1);
    }

    @Test
    public void GivenBookNullWillThrowException(){
        when(bookDAO.findBookById(1)).thenReturn(null);

        assertThrows(BookNotFoundException.class, () -> bookService.findBookByCode(1));
        assertThrows(BookNotFoundException.class, () -> bookService.updateBook(book1));
        assertThrows(BookNotFoundException.class, () -> bookService.deleteBookByCode(1));
        verify(bookDAO, never()).updateBook(book1);
        verify(bookDAO, never()).deleteById(1);
        verify(bookDAO, times(3)).findBookById(1);
    }
}


