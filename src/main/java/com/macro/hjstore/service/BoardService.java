package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.board.BoardJPQLRepository;
import com.macro.hjstore.model.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardJPQLRepository boardJPQLRepository;

    private final BoardRepository boardRepository;

    @MyLog
    public Page 게시글목록보기(int page){
        try {
            Page<Board> boardPG = boardJPQLRepository.findAll(page);
            return boardPG;
        }catch (Exception e){
            throw new Exception404("게시글이 존재하지 않습니다.");
        }
    }

    @MyLog
    public BoardResponse.DetailDTO 게시글상세보기(Long id){
        Board boardPS = boardRepository.findByIdFetchUser(id)
                .orElseThrow(() -> new Exception404("해당 게시글을 찾을 수가 없습니다."));
        BoardResponse.DetailDTO detailDTO = new BoardResponse.DetailDTO(
                boardPS.getTitle(),boardPS.getContent(),boardPS.getThumbnail(),boardPS.getUser().getUsername());
        return detailDTO;
    }

    @MyLog
    public void 글작성하기(Board board){
        boardRepository.save(board);

    }
}
