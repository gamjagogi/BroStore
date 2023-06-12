package com.macro.hjstore.controller;

import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/auth/shop")  // /auth/shop?page=1
    public ResponseEntity<?> mainPage(
            @RequestParam(defaultValue = "0") int page
            ){
        Page<Board> boardPG = boardService.게시글목록보기(page);
        System.out.println(boardPG.getTotalPages());
        ResponseDTO<?> responseDTO = new ResponseDTO<>(boardPG);
        return ResponseEntity.ok().body(responseDTO);
    }
}
