package com.macro.hjstore.controller;

import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareResponseDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.SoftwareService;
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
public class SoftwareShopController {

    private final SoftwareService softwareService;

    @GetMapping("/auth/software")
    public ResponseEntity<?> listAll(){
        List<SoftwareResponseDTO>boardList = softwareService.게시글목록보기();
        System.out.println(boardList);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/software/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        SoftwareResponseDTO.Detail detailDTO = softwareService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/manager/software/save")
    public ResponseEntity<?> save(@RequestBody @Valid SoftwareRequestDTO.Save saveDTO, Errors errors){
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

        try {
            softwareService.게시글저장하기(saveDTO);
        }catch (Exception e){
            throw new Exception400("userDetails 아니면 글작성하기에서 문제될수도! ","MyUserDetails내에 user객체를 찾을 수가 없습니다.");
        }
        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }
}
