package com.macro.hjstore.core.exception;

import com.macro.hjstore.dto.ResponseDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class Exception401 extends RuntimeException{

    public ResponseDTO<?>body(){
        return new ResponseDTO(HttpStatus.UNAUTHORIZED,"unAuthorized",getMessage());
    }

    public HttpStatus status(){
        return HttpStatus.UNAUTHORIZED;
    }
}
