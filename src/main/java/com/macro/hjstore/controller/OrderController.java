package com.macro.hjstore.controller;


import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.OrderService;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderController {

    private final UserService userService;
    private final OrderService orderService;

    @PostMapping("/auth/order/save/{id}")
    public ResponseEntity<?> createOrderSheet(@PathVariable Long id, @RequestBody OrderDTO.BeforePay beforePay
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {

        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            System.out.println("비포어!들어옴!!!" + userPS.getId());
            String userEmail = userPS.getEmail();
            String orderId = orderService.주문목록만들기(userEmail, beforePay);
            ResponseDTO<?> responseDTO = new ResponseDTO<>(orderId);
            return ResponseEntity.ok().body(orderId);
        } else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/auth/user/{id}/order/{orderId}")
    public ResponseEntity<?> getOrderSheet(@PathVariable("id") Long id, @PathVariable("orderId") String orderId
            , @AuthenticationPrincipal MyUserDetails userDetails) {
        if (userDetails.getUser().getId() == id) {

            String orderCode = orderId;
            System.out.println("주문서가져오기!!!" + orderCode);

            OrderDTO.ResponseOrderSheet responseOrderSheetPS = orderService.주문목록가져오기(orderCode);
            System.out.println("응답보내기직전!!!");
            ResponseDTO<?> responseDTO = new ResponseDTO<>(responseOrderSheetPS);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/auth/order/delete/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") Long id, @RequestBody OrderDTO.DeleteOrder deleteOrder
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            String orderCode = deleteOrder.getOrderId();

            System.out.println("주문id: "+orderCode);
            orderService.주문상태변경(orderCode);
            ResponseDTO responseDTO = new ResponseDTO<>();
            return ResponseEntity.ok().body(responseDTO);
        } else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/auth/user/orders/{id}")
    public ResponseEntity<?> getOrders(@PathVariable("id") Long id
            , @AuthenticationPrincipal MyUserDetails userDetails) {
        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            System.out.println("유저이메일 : "+userPS.getEmail());
            List<OrderDTO.ResponseOrders>orderListPS = orderService.주문서(userPS.getEmail());
            System.out.println("주문서응답직전 : "+ orderListPS.toString());
            ResponseDTO<?>responseDTO = new ResponseDTO<>(orderListPS);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
