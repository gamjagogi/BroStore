package com.macro.hjstore.core.exception;

import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.ValidDTO;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class Exception400 extends RuntimeException{

    private String key;

    private String value;

    public Exception400(String key, String value){
        super(value);
        this.key = key;
        this.value = value;
    }

    public ResponseDTO<?> body(){
        ValidDTO validDTO = new ValidDTO(key,value);
        return new ResponseDTO(HttpStatus.BAD_REQUEST,"badRequest", validDTO);
    }

    public HttpStatus status(){
        return HttpStatus.BAD_REQUEST;
    }
}
