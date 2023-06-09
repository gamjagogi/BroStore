package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.board.BoardJPQLRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardJPQLRepository boardJPQLRepository;

    @MyLog
    public Page 게시글목록보기(int page){
        try {
            Page<Board> boardPG = boardJPQLRepository.findAll(page);
            return boardPG;
        }catch (Exception e){
            throw new Exception404("게시글이 존재하지 않습니다.");
        }
    }
}
