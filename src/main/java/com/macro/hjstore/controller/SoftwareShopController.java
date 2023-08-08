package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareResponseDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.SoftwareService;
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
public class SoftwareShopController {

    private final SoftwareService softwareService;

    @GetMapping("/auth/software")
    public ResponseEntity<?> listAll(){
        List<SoftwareResponseDTO>boardList = softwareService.게시글목록보기();
        System.out.println(boardList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardList);
        return ResponseEntity.ok().body(responseDTO);
    }


    @GetMapping("/auth/software/crawling")
    public ResponseEntity< ? > crawlingList() {
        String category = "Web Crawling";
        List<SoftwareResponseDTO>crawlingList = softwareService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/software/macro")
    public ResponseEntity< ? > macroList() {
        String category = "Macro";
        List<SoftwareResponseDTO>crawlingList = softwareService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/software/monitoring")
    public ResponseEntity< ? > monitoringList() {
        String category = "Monitoring";
        List<SoftwareResponseDTO>crawlingList = softwareService.category목록보기(category);
        System.out.println(crawlingList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(crawlingList);
        return ResponseEntity.ok().body(responseDTO);
    }



    @GetMapping("/auth/software/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        SoftwareResponseDTO.Detail detailDTO = softwareService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/manager/software/save/{id}")
    public ResponseEntity<?> save(@PathVariable("id")Long id,@RequestBody @Valid SoftwareRequestDTO.Save saveDTO, Errors errors){

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


        softwareService.게시글저장하기(id,saveDTO);

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


    @PostMapping("/manager/software/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")Long id, @RequestBody @Valid SoftwareRequestDTO.Update updateDTO, Errors errors){

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

        // 요청 유저와 글 작성자가 일치하는지 확인
        Software softwarePS = softwareService.상품찾기(updateDTO.getSoftwareId());

        if(!softwarePS.getUserId().equals(id)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Software softwareUd = updateDTO.toEntity(softwarePS);

        softwareService.게시글수정하기(softwareUd);

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


    @PostMapping("/auth/software/delete/{id}/{userId}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id,@PathVariable("userId")Long userId,@AuthenticationPrincipal MyUserDetails userDetails){
        System.out.println(userId);
        System.out.println(userDetails.getUser().getId());

        if (userDetails.getUser().getId() == userId) {
            try {
                System.out.println("삭제 전!");
                softwareService.글삭제하기(id);
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






    @GetMapping("/manager/softwareProducts/{id}")
    public ResponseEntity<?> saleProduct(@PathVariable("id") Long id
            ,@AuthenticationPrincipal MyUserDetails userDetails){
        if (userDetails.getUser().getId() == id) {

            List<SoftwareResponseDTO>sellingList = softwareService.판매상품가져오기(id);

            ResponseDTO<?> responseDTO = new ResponseDTO<>(sellingList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            System.out.println("실패!!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
