package com.library.library.exception;

// this exception is called when the dates for whoch a book is requested,
// overlap with another already existing bookStudent (Issue) record, thus
// implying that the book is unavailable for issuing on the requested dates
public class UnavailableForGivenDatesException extends RuntimeException{
    private static final long serialVersionUID = 1L;
}
