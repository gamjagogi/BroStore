package com.macro.hjstore.controller;


import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
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

    @PostMapping("/auth/order/save/{id}")
    public ResponseEntity<?> createOrderSheet(@PathVariable Long id,@RequestBody OrderDTO.BeforePay beforePay
            ,@AuthenticationPrincipal MyUserDetails userDetails, Errors errors){

        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            System.out.println("비포어!들어옴!!!"+userPS.getId());
            String userEmail = userPS.getEmail();
            orderService.주문목록만들기(userEmail,beforePay);
            return ResponseEntity.ok().build();
        }else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/auth/order/user/{id}")
    public ResponseEntity<?> getOrderSheet(@PathVariable Long id,@AuthenticationPrincipal MyUserDetails userDetails
    ){
        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            System.out.println("주문서가져오기!!!"+userPS.getId());
            String userEmail = userPS.getEmail();

            OrderDTO.ResponseOrderSheet responseOrderSheetPS = orderService.주문목록가져오기(userEmail);

            System.out.println("응답보내기직전!!!");
            ResponseDTO<?>responseDTO = new ResponseDTO<>(responseOrderSheetPS);
            return ResponseEntity.ok().body(responseDTO);

        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
