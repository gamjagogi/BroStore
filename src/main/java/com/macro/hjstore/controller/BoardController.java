package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/auth/shop")  // /auth/shop?page=1
    public ResponseEntity<?> mainPage(
            @RequestParam(defaultValue = "0") int page,
    @AuthenticationPrincipal MyUserDetails userDetails
    ){
        //checkpoint : 권한 체크
        System.out.println(userDetails.getUser().getRole());
        Page<Board> boardPG = boardService.게시글목록보기(page);
        System.out.println(boardPG.getTotalPages());
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardPG);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/auth/shop/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        BoardResponse.DetailDTO detailDTO = boardService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/manager/shop/save")
    public ResponseEntity<?> savePost(@RequestBody @Valid BoardRequest.SaveInDTO saveInDTO
            , @AuthenticationPrincipal MyUserDetails userDetails,Errors errors){

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
            User userPS = userDetails.getUser();
            Board boardPS = saveInDTO.toEntity(userPS);
            boardService.글작성하기(boardPS);
        }catch (Exception e){
            throw new Exception400("userDetails 아니면 글작성하기에서 문제될수도! ","MyUserDetails내에 user객체를 찾을 수가 없습니다.");
        }
        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


}
