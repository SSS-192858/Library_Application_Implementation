package com.library.library.dao;

import com.library.library.entity.BookStudent;
import com.library.library.entity.Request;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OverlapDAO extends CrudRepository<BookStudent, Integer> {
    @Query("select bs from BookStudent bs where bs.book.book_code = :#{#request.getBook().getBook_code()} and bs.start_date not between :#{request.getStart_date()} and :#{request.getEnd_date()} and bs.end_date not between :#{request.getStart_date()} and :#{request.getEnd_date()}")
    public List<BookStudent> overlap(@Param("request") Request request);
}
