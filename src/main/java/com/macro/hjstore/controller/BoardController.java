package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.comment.Comment;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.BoardService;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

    private final UserService userService;

    @GetMapping("/board")
    public ResponseEntity<?> mainPage(){
            List<BoardResponse.UserBoard>userBoardList = boardService.게시글목록보기();
            System.out.println("게시물리스트 가져옴!!!");
            ResponseDTO<?> responseDTO = new ResponseDTO<>(userBoardList);
            return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/board/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id){
        BoardResponse.DetailDTO detailDTO = boardService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/auth/board/comment/save/{userId}/{boardId}")
    public ResponseEntity<?> createComment(@PathVariable("userId")Long userId,@PathVariable("boardId")Long boardId,@RequestBody BoardRequest.CreateComment comment,@AuthenticationPrincipal MyUserDetails userDetails,Errors errors){
        if (userDetails.getUser().getId() == userId) {
            System.out.println("댓글작성진입!!");
            User userPS = userService.회원찾기(userId);
            Board boardPS = boardService.보드ID로글찾기(boardId);
            Comment commentPS = comment.toEntity(userPS,boardPS);
            boardService.댓글저장하기(commentPS);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/board/comment/update/{userId}/{boardId}/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable("userId")Long userId,@PathVariable("boardId")Long boardId,@PathVariable("commentId")Long commentId,@RequestBody BoardRequest.UpdateComment comment,@AuthenticationPrincipal MyUserDetails userDetails,Errors errors){
        if (userDetails.getUser().getId() == userId) {
            User userPS = userService.회원찾기(userId);
            Board boardPS = boardService.보드ID로글찾기(boardId);
            Comment commentPS = boardService.댓글찾기(commentId);
            Comment updatedCommentPS = comment.toEntity(commentPS,userPS,boardPS);
            boardService.댓글저장하기(updatedCommentPS);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/board/save")
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

    @PostMapping("/auth/board/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody @Valid BoardRequest.UpdateInDTO updateDTO, @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            try {
                Board boardPS = boardService.보드ID로글찾기(updateDTO.getBoardId());

                if (boardPS.getUser().getId() != id) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }

                boardService.게시글수정하기(id,updateDTO);
                System.out.println("수정완료!!");

                ResponseDTO<?> responseDTO = new ResponseDTO<>();
                return ResponseEntity.ok().body(responseDTO);
            }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/board/delete/{id}/{userId}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id,@PathVariable("userId")Long userId,@AuthenticationPrincipal MyUserDetails userDetails){

        if (userDetails.getUser().getId() == userId) {
            try {
                boardService.글삭제하기(id);
                return ResponseEntity.ok().build();
            }catch (Exception e){
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/board/search")
    public ResponseEntity<?>search(@RequestParam("keyword")String keyword){
        try {
            List<BoardResponse.UserBoard>userBoardList = boardService.검색(keyword);
            ResponseDTO<?>responseDTO = new ResponseDTO<>(userBoardList);
            return ResponseEntity.ok().body(responseDTO);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
