package com.macro.hjstore.controller;


import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.dto.user.UserResponse;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.el.stream.Optional;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//ㅇㅇㅇ
import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserRequest.LoginInDTO loginInDTO, Errors errors) {
        Pair<String,String>tokenUS = userService.로그인(loginInDTO);
        //checkpoint : loginOutDTO를 다시 만들어라.
        UserResponse.LoginOutDTO loginOutDTO = userService.이메일로회원조회(loginInDTO.getEmail());

        ResponseDTO<?> responseDTO = new ResponseDTO<>(loginOutDTO);
        return ResponseEntity.ok().header(tokenUS.getFirst()).header(tokenUS.getSecond())
                .body(responseDTO);
    }
}
