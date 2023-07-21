package com.macro.hjstore.controller;

import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/auth/delivery")
    public ResponseEntity<?> listAll(){
        List<DeliveryResponseDTO>boardList = deliveryService.게시글목록보기();
        System.out.println(boardList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardList);
        return ResponseEntity.ok().body(responseDTO);
    }


    @GetMapping("/auth/delivery/electronics")
    public ResponseEntity< ? > crawlingList() {
        String category = "Electronics";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/delivery/clothes")
    public ResponseEntity< ? > macroList() {
        String category = "Clothes";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/delivery/toy")
    public ResponseEntity< ? > monitoringList() {
        String category = "Toy";
        List<DeliveryResponseDTO>crawlingList = deliveryService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }



    @GetMapping("/auth/delivery/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        DeliveryResponseDTO.Detail detailDTO = deliveryService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/manager/delivery/save")
    public ResponseEntity<?> save(@RequestBody @Valid DeliveryRequestDTO.Save saveDTO, Errors errors){

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

        System.out.println("저장하기직전");
        deliveryService.게시글저장하기(saveDTO);

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }
}
