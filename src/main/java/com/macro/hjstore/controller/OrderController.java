package com.macro.hjstore.controller;


import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.OrderService;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class OrderController {

    private final UserService userService;
    private final OrderService orderService;

    @PostMapping("/auth/user/order/{id}")
    public ResponseEntity<?> createOrderSheet(@PathVariable Long id,@RequestBody OrderDTO.BeforePay beforePay
            ,@AuthenticationPrincipal MyUserDetails userDetails, Errors errors){

        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            System.out.println("비포어!들어옴!!!"+userPS.getId());
            orderService.addOrderSheet(userPS,beforePay);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

//    @GetMapping("")
//    public ResponseEntity<?> getOrderSheet(){
//
//    }
}
