package com.macro.hjstore.core.exception;

import com.macro.hjstore.dto.ResponseDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class Exception403 extends RuntimeException{
    public Exception403(String message){
        super(message);
    }

    public ResponseDTO<?> body(){
        return new ResponseDTO(HttpStatus.FORBIDDEN,"forbidden",getMessage());
    }

    public HttpStatus status(){
        return HttpStatus.FORBIDDEN;
    }

}
