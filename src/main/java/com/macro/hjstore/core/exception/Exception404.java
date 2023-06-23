package com.macro.hjstore.core.exception;

import com.macro.hjstore.dto.ResponseDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class Exception404 extends RuntimeException{

    public Exception404(String message){
        super(message);
    }

    public ResponseDTO<?> body(){
        return new ResponseDTO(HttpStatus.NOT_FOUND,"notFound",getMessage());
    }

    public HttpStatus status(){
        return HttpStatus.NOT_FOUND;
    }
}
