package com.macro.hjstore.controller;


import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
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
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@RestController
public class OrderController {

    //WebClient webClient = WebClient.create();
    private final Map<String, Timer> orderTimers = new ConcurrentHashMap<>();

    private final UserService userService;
    private final OrderService orderService;

    @PostMapping("/auth/order/save/{id}")
    public ResponseEntity<?> createOrderSheet(@PathVariable Long id, @RequestBody OrderDTO.BeforePay beforePay
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {

        if (userDetails.getUser().getId() == id) {
            User userPS = userService.회원찾기(id);
            String userEmail = userPS.getEmail();
            String orderId = orderService.주문목록만들기(userEmail, beforePay);

            // 주문에 대한 타이머 시작
//            Timer timer = new Timer();
//            timer.schedule(new TimerTask() {
//                @Override
//                public void run() {
//                    // getOrderSheet 메서드가 호출되지 않았을 경우 주문을 자동으로 삭제
//                    orderService.주문목록삭제(orderId);
//                    orderTimers.remove(orderId);
//                }
//            }, 1 * 60 * 1000); // 5분(밀리초 단위로 지정)
//
//            // 맵에 타이머 저장
//            orderTimers.put(orderId, timer);

            return ResponseEntity.ok().body(orderId);
        } else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/auth/user/{id}/order/{orderId}")
    public ResponseEntity<?> getOrderSheetWaitPayments(@PathVariable("id") Long id, @PathVariable("orderId") String orderId
            , @AuthenticationPrincipal MyUserDetails userDetails) {
        if (userDetails.getUser().getId() == id) {

            User userPS = userService.회원찾기(id);
            String customerKey = userPS.getCustomerKey();
            String orderCode = orderId;
            OrderDTO.ResponseOrderSheet responseOrderSheetPS = orderService.주문목록가져오기(orderCode,customerKey);
            ResponseDTO<?> responseDTO = new ResponseDTO<>(responseOrderSheetPS);

            // getOrderSheet 메서드가 호출되면 해당 주문에 대한 타이머 취소
//            Timer timer = orderTimers.get(orderId);
//            if (timer != null && responseOrderSheetPS!=null) {
//                timer.cancel();
//                orderTimers.remove(orderId);
//            }

            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/auth/order/status/{userId}/{orderId}")
    public ResponseEntity<?> changOrderStatus(@PathVariable("userId")Long userId,@PathVariable("orderId")String orderId,
            @RequestBody Integer code,@AuthenticationPrincipal MyUserDetails userDetails){
        if (userDetails.getUser().getId() == userId) {
            try {
                String orderCode = orderId;
                orderService.주문상태변경(orderCode, code);
                return ResponseEntity.ok().build();
            }catch (Exception e){
                throw new Exception400("에러발생",e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @PostMapping("/auth/order/delete/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") Long id, @RequestBody OrderDTO.DeleteOrder deleteOrder
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        System.out.println("본인확인!!");
        if (userDetails.getUser().getId() == id) {
            System.out.println("진입!!");
            String orderCode = deleteOrder.getOrderId();

            System.out.println("주문id: "+orderCode);
            orderService.주문취소(orderCode);
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

            List<OrderDTO.ResponseOrders>orderListPS = orderService.주문서(userPS.getEmail());

            ResponseDTO<?>responseDTO = new ResponseDTO<>(orderListPS);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
