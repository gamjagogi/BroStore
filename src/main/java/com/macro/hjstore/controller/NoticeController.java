package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.notice.NoticeDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.notice.Notice;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.NoticeService;
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
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/notice")
    public ResponseEntity<?> getBoard(){
        List<NoticeDTO.NoticeElement> userBoardList = noticeService.게시글목록보기();
        ResponseDTO<?> responseDTO = new ResponseDTO<>(userBoardList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/notice/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        NoticeDTO.Detail detailDTO = noticeService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/auth/notice/save")
    public ResponseEntity<?> savePost(@RequestBody @Valid NoticeDTO.SaveInDTO saveInDTO
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors){

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
            Notice noticePS = saveInDTO.toEntity(userPS);
            noticeService.글작성하기(noticePS);
        }catch (Exception e){
            throw new Exception400("에러발생 : ",e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/notice/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody @Valid NoticeDTO.UpdateInDTO updateDTO, @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            try {
                Notice noticePS = noticeService.보드ID로글찾기(updateDTO.getBoardId());

                if (noticePS.getUser().getId() != id) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }

                noticeService.게시글수정하기(noticePS,id,updateDTO);


                return ResponseEntity.ok().build();
            }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/notice/delete/{id}/{userId}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id,@PathVariable("userId")Long userId,@AuthenticationPrincipal MyUserDetails userDetails){

        if (userDetails.getUser().getId() == userId) {
            try {
                noticeService.글삭제하기(id);
                return ResponseEntity.ok().build();
            }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/notice/search")
    public ResponseEntity<?>search(@RequestParam("keyword")String keyword){
        try {
            List<NoticeDTO.NoticeElement>userBoardList = noticeService.검색(keyword);
            ResponseDTO<?>responseDTO = new ResponseDTO<>(userBoardList);
            return ResponseEntity.ok().body(responseDTO);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
