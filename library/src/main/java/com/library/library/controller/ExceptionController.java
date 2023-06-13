package com.library.library.controller;

import com.library.library.exception.UnavailableForGivenDatesException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value = UnavailableForGivenDatesException.class)
    public ResponseEntity<Object> unavailableForGivenDates(UnavailableForGivenDatesException unavailableForGivenDatesException){
        return new ResponseEntity<>("Request for this book has already been accepted for some other student for the given dates, hence this request has been deleted.", HttpStatus.BAD_REQUEST);
    }
}
