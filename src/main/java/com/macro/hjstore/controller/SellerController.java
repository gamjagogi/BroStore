package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.dto.seller.SellerDTO;
import com.macro.hjstore.model.seller.Seller;
import com.macro.hjstore.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class SellerController {

    private final SellerService sellerService;


    @GetMapping("/manager/progressOrders/{id}")
    public ResponseEntity<?> sellersOrders(@PathVariable("id") Long id, @AuthenticationPrincipal MyUserDetails userDetails){
        if (userDetails.getUser().getId() == id) {
            // Errors errors 는 @RequestBody 뒤에 붙어야한다.
            try {

                List<Seller> sellerListPS = sellerService.판매자아이디로주문서찾기(id);

                List<SellerDTO.ResponseOrders>responseOrders = sellerListPS.stream().map(seller -> new SellerDTO.ResponseOrders(seller)).collect(Collectors.toList());
           ;
                ResponseDTO<?>responseDTO = new ResponseDTO<>(responseOrders);
                return ResponseEntity.ok().body(responseDTO);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/manager/cancelOrder/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable("id") Long id, @RequestBody OrderDTO.DeleteOrder deleteOrder
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            String orderCode = deleteOrder.getOrderId();

            System.out.println("주문id: "+orderCode);
            sellerService.주문취소완료처리(orderCode);
            ResponseDTO responseDTO = new ResponseDTO<>();
            return ResponseEntity.ok().body(responseDTO);
        } else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/manager/deliveryComplite/{id}")
    public ResponseEntity<?> deliveryComplite(@PathVariable("id") Long id, @RequestBody OrderDTO.DeleteOrder deleteOrder
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            String orderCode = deleteOrder.getOrderId();

            System.out.println("주문id: "+orderCode);
            sellerService.주문배달완료처리(orderCode);
            ResponseDTO responseDTO = new ResponseDTO<>();
            return ResponseEntity.ok().body(responseDTO);
        } else {
            System.out.println(errors);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
