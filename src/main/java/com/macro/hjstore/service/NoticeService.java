package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.board.BoardRequest;
import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.dto.notice.NoticeDTO;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.notice.Notice;
import com.macro.hjstore.model.notice.NoticeJPQLRepository;
import com.macro.hjstore.model.notice.NoticeRepository;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    private final NoticeJPQLRepository noticeJPQLRepository;

    private final UserService userService;

    @MyLog
    public List<NoticeDTO.NoticeElement> 게시글목록보기(){
        try {
            List<Notice> noticeList = noticeRepository.findAllBySorted();
            System.out.println("공지 리스트 찾음! 이제 공지 하나하나, 응답을 위해 필터링!");
            List<NoticeDTO.NoticeElement>userBoardList = noticeList.stream()
                    .map(notice -> new NoticeDTO.NoticeElement(notice)).collect(Collectors.toList());
            System.out.println("응답준비 완료!");
            return userBoardList;
        }catch (Exception e){
            throw new Exception404("게시글이 존재하지 않습니다.  에러내용: "+e.getMessage());
        }
    }

    @MyLog
    public NoticeDTO.Detail 게시글상세보기(Long id){
        Notice noticePS = noticeRepository.findByIdFetchUser(id)
                .orElseThrow(() -> new Exception404("해당 게시글을 찾을 수가 없습니다."));
        NoticeDTO.Detail detailDTO = new NoticeDTO.Detail(noticePS);
        return detailDTO;
    }

    @MyLog
    public void 글작성하기(Notice board){
        noticeRepository.save(board);
    }


    @MyLog
    public Notice 보드ID로글찾기(Long boardId){
        Notice boardPS = noticeRepository.findById(boardId)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다!"));
        return boardPS;
    }

    @MyLog
    @Transactional
    public void 게시글수정하기(Notice notice,Long userId, NoticeDTO.UpdateInDTO update){
        User userPS =  userService.회원찾기(userId);
        System.out.println("수정한 게시글 제목: "+update.getTitle());
        Notice boardPS = update.toUpdateEntity(notice,userPS);
        noticeRepository.save(boardPS);
    }

    @MyLog
    @Transactional
    public void 글삭제하기(Long id){
            Notice boardPS = noticeRepository.findById(id)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다."));
        System.out.println("해당 글찾기 완료, 삭제직전!!!!!");
        noticeRepository.delete(boardPS);
    }

    @MyLog
    @Transactional
    public List<NoticeDTO.NoticeElement>검색(String keyword) throws Exception404{
        List<Notice> boardList = noticeJPQLRepository.findAllByKeyword(keyword);
        List<NoticeDTO.NoticeElement>userBoardList = boardList.stream()
                .map(board -> new NoticeDTO.NoticeElement(board)).collect(Collectors.toList());
        return userBoardList;
    }
}
