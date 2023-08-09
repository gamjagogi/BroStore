package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.comment.Comment;
import com.macro.hjstore.model.comment.QuestionComment;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.BoardService;
import com.macro.hjstore.service.QuestionService;
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
public class QuestionController {

    private final QuestionService questionService;

    private final UserService userService;

    @GetMapping("/auth/question/{id}")
    public ResponseEntity<?> mainPage(
            @PathVariable("id") Long id, @AuthenticationPrincipal MyUserDetails userDetails) {
        if (userDetails.getUser().getId() == id) {

            List<BoardResponse.QuestionBoard> questionBoardList = questionService.게시글목록보기();
            ResponseDTO<?> responseDTO = new ResponseDTO<>(questionBoardList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            throw new Exception404("시큐리티 유저와 로그인 유저가 일치하지 않습니다.");
        }
    }

    @GetMapping("/auth/question/seller/{id}")
    public ResponseEntity<?> requestSeller(@PathVariable("id") Long id, @AuthenticationPrincipal MyUserDetails userDetails) {
        if (userDetails.getUser().getId() == id) {
            String category = "RequestSeller";
            List<BoardResponse.QuestionBoard> categoryList = questionService.category목록보기(category);
            System.out.println(categoryList);
            ResponseDTO<?> responseDTO = new ResponseDTO<>(categoryList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            throw new Exception404("시큐리티 유저와 로그인 유저가 일치하지 않습니다.");
        }
    }


    @GetMapping("/auth/question/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id) {
        BoardResponse.QuestionDetail detailDTO = questionService.게시글상세보기(id);
        ResponseDTO responseDTO = new ResponseDTO(detailDTO);
        return ResponseEntity.ok().body(responseDTO);
    }

    @PostMapping("/auth/question/save")
    public ResponseEntity<?> savePost(@RequestBody @Valid BoardRequest.QuestionSaveIn saveInDTO
            , @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {

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
            Question questionPS = saveInDTO.toQuestionEntity(userPS);
            questionService.글작성하기(questionPS);
        } catch (Exception e) {
            throw new Exception400("userDetails 아니면 글작성하기에서 문제될수도! ", "MyUserDetails내에 user객체를 찾을 수가 없습니다.");
        }
        ResponseDTO<?> responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }


    @PostMapping("/auth/question/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody @Valid BoardRequest.QuestionUpdateIn updateDTO, @AuthenticationPrincipal MyUserDetails userDetails, Errors errors) {
        if (userDetails.getUser().getId() == id) {
            try {
                Question questionPS = questionService.보드ID로글찾기(updateDTO.getBoardId());

                if (questionPS.getUser().getId() != id) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }

                questionService.게시글수정하기(questionPS,id,updateDTO);


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

    @GetMapping("/auth/question/search")
    public ResponseEntity<?>search(@RequestParam("keyword")String keyword){
        try {
            List<BoardResponse.QuestionBoard>userBoardList = questionService.검색(keyword);
            ResponseDTO<?>responseDTO = new ResponseDTO<>(userBoardList);
            return ResponseEntity.ok().body(responseDTO);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/auth/question/delete/{id}/{userId}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id,@PathVariable("userId")Long userId,@AuthenticationPrincipal MyUserDetails userDetails){

        if (userDetails.getUser().getId() == userId) {
            try {
                System.out.println("삭제 전!");
                questionService.글삭제하기(id);
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

    @PostMapping("/auth/question/comment/save/{userId}/{boardId}")
    public ResponseEntity<?> createComment(@PathVariable("userId")Long userId,@PathVariable("boardId")Long boardId,@RequestBody BoardRequest.CreateComment comment,@AuthenticationPrincipal MyUserDetails userDetails,Errors errors){
        if (userDetails.getUser().getId() == userId) {
            System.out.println("댓글작성진입!!");
            User userPS = userService.회원찾기(userId);
            Question questionPS = questionService.보드ID로글찾기(boardId);
            QuestionComment commentPS = comment.toQuestionEntity(userPS,questionPS);
            questionService.댓글저장하기(commentPS);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/question/comment/update/{userId}/{boardId}/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable("userId")Long userId,@PathVariable("boardId")Long boardId,@PathVariable("commentId")Long commentId,@RequestBody BoardRequest.UpdateComment comment,@AuthenticationPrincipal MyUserDetails userDetails,Errors errors){
        if (userDetails.getUser().getId() == userId) {
            User userPS = userService.회원찾기(userId);
            Question questionPS = questionService.보드ID로글찾기(boardId);
            QuestionComment commentPS = questionService.댓글찾기(commentId);
            QuestionComment updatedCommentPS = comment.toQuestionEntity(commentPS,userPS,questionPS);
            questionService.댓글저장하기(updatedCommentPS);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/auth/question/comment/delete/{userId}/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("userId")Long userId,@PathVariable("commentId")Long commentId,@AuthenticationPrincipal MyUserDetails userDetails){
        if (userDetails.getUser().getId() == userId) {
            System.out.println("댓삭 진입!");
            QuestionComment commentPS = questionService.댓글찾기(commentId);
            questionService.댓글삭제하기(commentPS);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}
