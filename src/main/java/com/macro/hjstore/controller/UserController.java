package com.macro.hjstore.controller;


import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.dto.user.UserResponse;

import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserRequest.LoginInDTO loginInDTO, Errors errors) {

        Pair<String,String>tokenUS = userService.로그인(loginInDTO);
        //checkpoint : loginOutDTO를 다시 만들어라.
        UserResponse.LoginOutDTO loginOutDTO = userService.이메일로회원조회(loginInDTO.getEmail());

        System.out.println(tokenUS.getFirst());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "access-token, refresh-token"); // 추가
        headers.add("access-token", tokenUS.getFirst());
        headers.add("refresh-token", tokenUS.getSecond());

        String accessToken = headers.getFirst("access-token");
        System.out.println("Access Token: " + accessToken);

        ResponseDTO<?> responseDTO = new ResponseDTO<>(loginOutDTO);

        return ResponseEntity.ok()
                .headers(headers)
                .body(responseDTO);
    }

    @PostMapping("/join")
    @Transactional
    public ResponseEntity<?> join(@RequestBody @Valid UserRequest.JoinInDTO joinInDTO, Errors errors){
        userService.회원가입(joinInDTO);
        return ResponseEntity.ok().build();
    }


}
