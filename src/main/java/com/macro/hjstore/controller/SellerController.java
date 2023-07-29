package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.seller.SellerDTO;
import com.macro.hjstore.model.seller.Seller;
import com.macro.hjstore.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
                System.out.println("판매자오더진입!");
                List<Seller> sellerListPS = sellerService.판매자아이디로주문서찾기(id);
                System.out.println("셀러찾음");
                List<SellerDTO.ResponseOrders>responseOrders = sellerListPS.stream().map(seller -> new SellerDTO.ResponseOrders(seller)).collect(Collectors.toList());
                System.out.println("dto로 만듬!!!");
                ResponseDTO<?>responseDTO = new ResponseDTO<>(responseOrders);
                return ResponseEntity.ok().body(responseDTO);
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
