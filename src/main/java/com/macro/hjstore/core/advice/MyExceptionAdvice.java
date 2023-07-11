package com.macro.hjstore.core.advice;

import com.macro.hjstore.core.annotation.MyErrorLog;
import com.macro.hjstore.core.exception.*;
import com.macro.hjstore.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class MyExceptionAdvice {

    @MyErrorLog
    @ExceptionHandler(Exception400.class)
    public ResponseEntity<?>badRequest(Exception400 e){
        return new ResponseEntity<>(e.body(),e.status());
    }

    @MyErrorLog
    @ExceptionHandler(Exception401.class)
    public ResponseEntity<?>authorized(Exception401 e){
        return new ResponseEntity<>(e.body(),e.status());
    }

    @MyErrorLog
    @ExceptionHandler(Exception403.class)
    public ResponseEntity<?>forbidden(Exception403 e){
        return new ResponseEntity<>(e.body(),e.status());
    }

    @MyErrorLog
    @ExceptionHandler(Exception404.class)
    public ResponseEntity<?>notFound(Exception404 e){
        return new ResponseEntity<>(e.body(),e.status());
    }

    @MyErrorLog
    @ExceptionHandler(Exception500.class)
    public ResponseEntity<?>serverError(Exception500 e){
        return new ResponseEntity<>(e.body(),e.status());
    }

    @MyErrorLog
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?>serverError(Exception e){
        ResponseDTO<?> body = new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR,"unknownServerError",e.getMessage());
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
