package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.board.BoardJPQLRepository;
import com.macro.hjstore.model.board.BoardRepository;
import com.macro.hjstore.model.comment.Comment;
import com.macro.hjstore.model.comment.QuestionComment;
import com.macro.hjstore.model.comment.QuestionCommentRepository;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.question.QuestionJPQLRepository;
import com.macro.hjstore.model.question.QuestionRepository;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionJPQLRepository questionJPQLRepository;

    private final QuestionRepository questionRepository;

    private final UserService userService;

    private final QuestionCommentRepository questionCommentRepository;

    @MyLog
    public List<BoardResponse.QuestionBoard> 게시글목록보기(){
        try {
            List<Question> boardList = questionRepository.findAllBySorted();
            List<BoardResponse.QuestionBoard>userBoardList = boardList.stream()
                    .map(question -> new BoardResponse.QuestionBoard(question)).collect(Collectors.toList());

            return userBoardList;
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new Exception404("게시글이 존재하지 않습니다.");
        }
    }


    @MyLog
    public List<BoardResponse.QuestionBoard> category목록보기(String category) throws Exception404{

        try {
            List<Question> questionList = questionRepository.findByCategory(category);
            List<BoardResponse.QuestionBoard> newList = questionList.stream()
                    .map(question -> new BoardResponse.QuestionBoard(question)).collect(Collectors.toList());
            return newList;
        }catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception404("게시글을 찾을 수 없습니다.");
        }
    }

    @MyLog
    public BoardResponse.QuestionDetail 게시글상세보기(Long id){
        Question boardPS = questionRepository.findByIdFetchUser(id)
                .orElseThrow(() -> new Exception404("해당 게시글을 찾을 수가 없습니다."));
        List<BoardResponse.Comments>comments = boardPS.getCommentList().stream().map(comment -> new BoardResponse.Comments(comment)).collect(Collectors.toList());
        BoardResponse.QuestionDetail detailDTO = new BoardResponse.QuestionDetail(id,
                boardPS.getTitle(),boardPS.getContent(),boardPS.getThumbnail(),boardPS.getUser().getUsername(),boardPS.getCategory(),boardPS.getUser().getId(),comments);
        return detailDTO;
    }

    @MyLog
    public void 글작성하기(Question question){
        questionRepository.save(question);
    }

    @MyLog
    public Question 보드ID로글찾기(Long boardId){
        Question questionPS = questionRepository.findById(boardId)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다!"));
        return questionPS;
    }

    @MyLog
    @Transactional
    public void 게시글수정하기(Question question,Long userId, BoardRequest.QuestionUpdateIn update){
        User userPS =  userService.회원찾기(userId);
        System.out.println("수정한 게시글 제목: "+update.getTitle());
        Question questionPS = update.toQuestionUpdateEntity(question,userPS);
        questionRepository.save(questionPS);
    }

    @MyLog
    @Transactional
    public List<BoardResponse.QuestionBoard>검색(String keyword) throws Exception404{
        List<Question> boardList = questionJPQLRepository.findAllByKeyword(keyword);
        List<BoardResponse.QuestionBoard>userBoardList = boardList.stream()
                .map(board -> new BoardResponse.QuestionBoard(board)).collect(Collectors.toList());
        return userBoardList;
    }

    @MyLog
    @Transactional
    public void 글삭제하기(Long id){
        Question boardPS = questionRepository.findById(id)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다."));
        System.out.println("해당 글찾기 완료, 삭제직전!!!!!");
        questionRepository.delete(boardPS);
    }

    @MyLog
    @Transactional
    public void 댓글저장하기(QuestionComment comment){
        questionCommentRepository.save(comment);
    }

    @MyLog
    @Transactional
    public QuestionComment 댓글찾기(Long commentId){
        QuestionComment commentPS = questionCommentRepository.findById(commentId)
                .orElseThrow(() -> new Exception404("댓글을 찾을 수 없습니다."));
        return commentPS;
    }


    @MyLog
    @Transactional
    public void 댓글삭제하기(QuestionComment comment){
        questionCommentRepository.delete(comment);
    }
}
