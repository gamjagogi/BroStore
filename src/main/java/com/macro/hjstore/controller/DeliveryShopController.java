package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.DeliveryService;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class DeliveryShopController {

    private final DeliveryService deliveryService;

    private final UserService userService;

    @GetMapping("/delivery")
    public ResponseEntity<?> listAll(){
        List<DeliveryResponseDTO>boardList = deliveryService.게시글목록보기();
        System.out.println(boardList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardList);
        return ResponseEntity.ok().body(responseDTO);
    }


    @GetMapping("/delivery/electronics")
    public ResponseEntity< ? > crawlingList() {
        String category = "Electronics";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/delivery/clothes")
    public ResponseEntity< ? > macroList() {
        String category = "Clothes";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/delivery/toy")
    public ResponseEntity< ? > monitoringList() {
        String category = "Toy";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }



    @GetMapping("/delivery/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        DeliveryResponseDTO.Detail detailDTO = deliveryService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/manager/delivery/save/{id}")
    public ResponseEntity<?> save(@PathVariable("id")Long id,@RequestBody @Valid DeliveryRequestDTO.Save saveDTO, Errors errors){

        System.out.println("진입");
        if (errors.hasErrors()) {
            // 오류 처리 로직 작성
            List<String> errorMessages = new ArrayList<>();

            for (ObjectError error : errors.getAllErrors()) {
                System.out.println("오류 메시지: " + error.getDefaultMessage());
                // 오류 처리 로직 추가...
                String errorMessage = error.getDefaultMessage();
                errorMessages.add(errorMessage);
            }
            // 적절한 오류 응답 반환
            return ResponseEntity.badRequest().body(errorMessages); // 예시로 "오류 발생"이라는 메시지를 반환하였습니다.
        }


        deliveryService.게시글저장하기(id,saveDTO);

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


    @PostMapping("/manager/delivery/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")Long id,@RequestBody @Valid DeliveryRequestDTO.Update updateDTO, Errors errors){

        System.out.println("진입");
        if (errors.hasErrors()) {
            // 오류 처리 로직 작성
            List<String> errorMessages = new ArrayList<>();

            for (ObjectError error : errors.getAllErrors()) {
                System.out.println("오류 메시지: " + error.getDefaultMessage());
                // 오류 처리 로직 추가...
                String errorMessage = error.getDefaultMessage();
                errorMessages.add(errorMessage);
            }
            // 적절한 오류 응답 반환
            return ResponseEntity.badRequest().body(errorMessages); // 예시로 "오류 발생"이라는 메시지를 반환하였습니다.
        }

        Delivery deliveryPS = deliveryService.상품찾기(updateDTO.getProductId());

        // 현재 유저와, 게시물 작성자 유저가 일치하는지 확인.
        User userPS = userService.회원찾기(id);
        if(deliveryPS.getUserId()!=userPS.getId()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        deliveryService.게시글수정하기(id,deliveryPS,updateDTO);
        System.out.println("수정완료!!");

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


    @PostMapping("/auth/delivery/delete/{id}/{userId}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id,@PathVariable("userId")Long userId,@AuthenticationPrincipal MyUserDetails userDetails){

        if (userDetails.getUser().getId() == userId) {
            try {
                System.out.println("삭제 전!");
                deliveryService.글삭제하기(id);
                System.out.println("삭제완료!!");
                return ResponseEntity.ok().build();
            }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }




    // 판매중인 목록 불러오기.
    @GetMapping("/manager/products/{id}")
    public ResponseEntity<?> saleProduct(@PathVariable("id") Long id
            ,@AuthenticationPrincipal MyUserDetails userDetails){
        if (userDetails.getUser().getId() == id) {

            List<DeliveryResponseDTO>sellingList = deliveryService.판매상품가져오기(id);

            ResponseDTO<?> responseDTO = new ResponseDTO<>(sellingList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            System.out.println("실패!!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
