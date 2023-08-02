package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.board.BoardJPQLRepository;
import com.macro.hjstore.model.board.BoardRepository;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardJPQLRepository boardJPQLRepository;

    private final BoardRepository boardRepository;

    private final UserService userService;

    @MyLog
    public List<BoardResponse.UserBoard> 게시글목록보기(){
        try {
            //Page<Board> boardPG = boardJPQLRepository.findAll(page);
            List<Board> boardList = boardRepository.findAllBySorted();
            List<BoardResponse.UserBoard>userBoardList = boardList.stream()
                    .map(board -> new BoardResponse.UserBoard(board)).collect(Collectors.toList());

            System.out.println(userBoardList.toString());

            return userBoardList;
        }catch (Exception e){
            throw new Exception404("게시글이 존재하지 않습니다.");
        }
    }

    @MyLog
    public BoardResponse.DetailDTO 게시글상세보기(Long id){
        Board boardPS = boardRepository.findByIdFetchUser(id)
                .orElseThrow(() -> new Exception404("해당 게시글을 찾을 수가 없습니다."));
        BoardResponse.DetailDTO detailDTO = new BoardResponse.DetailDTO(
                boardPS.getTitle(),boardPS.getContent(),boardPS.getThumbnail(),boardPS.getUser().getUsername(),boardPS.getUser().getId());
        return detailDTO;
    }

    @MyLog
    public void 글작성하기(Board board){
        boardRepository.save(board);

    }


    @MyLog
    public Board 보드ID로글찾기(Long boardId){
        Board boardPS = boardRepository.findById(boardId)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다!"));
        return boardPS;
    }

    @MyLog
    @Transactional
    public void 게시글수정하기(Long userId, BoardRequest.UpdateInDTO update){
        User userPS =  userService.회원찾기(userId);
        System.out.println("수정한 게시글 제목: "+update.getTitle());
        Board boardPS = update.toUpdateEntity(userPS);
        boardRepository.save(boardPS);
    }

    @MyLog
    @Transactional
    public void 글삭제하기(Long id){
        Board boardPS = boardRepository.findById(id)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다."));
        System.out.println("해당 글찾기 완료, 삭제직전!!!!!");
        boardRepository.delete(boardPS);
    }

    @MyLog
    @Transactional
    public List<BoardResponse.UserBoard>검색(String keyword) throws Exception{
        List<Board> boardList = boardJPQLRepository.findAllByKeyword(keyword);
        List<BoardResponse.UserBoard>userBoardList = boardList.stream()
                .map(board -> new BoardResponse.UserBoard(board)).collect(Collectors.toList());
        return userBoardList;
    }
}
