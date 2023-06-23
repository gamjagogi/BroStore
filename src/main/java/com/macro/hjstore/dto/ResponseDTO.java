package com.macro.hjstore.dto;

import lombok.Getter;
import org.springframework.http.HttpStatus;


// 기본생성자 성공, 그 외에 추가로 매개변수가 존재한 생성자를 사용해서, 하나는 데이터를 전달하는 성공!, 하나는 실패
@Getter
public class ResponseDTO<T> {

    private Integer status;

    private String msg;

    private T data;

    public ResponseDTO(){
        this.status = HttpStatus.OK.value();
        this.msg = "성공";
    }

    public ResponseDTO(T data){
        this.status = HttpStatus.OK.value();
        this.data = data;
        this.msg = "성공";
    }

    public ResponseDTO(HttpStatus httpStatus, String msg, T data){
        this.status = httpStatus.value(); // 밸류!!붙여줘라.
        this.msg = msg; // 에러제목
        this.data = data; // 에러내용
    }
}
