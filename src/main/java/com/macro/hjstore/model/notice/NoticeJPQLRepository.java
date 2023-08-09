package com.macro.hjstore.model.notice;

import com.macro.hjstore.model.board.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class NoticeJPQLRepository {

    private final EntityManager em;


    public List<Notice> findAllByKeyword(String keyword) {
        List<Notice> boardListPS = em.createQuery("select b from Notice b where b.title like :keyword or b.content like :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();
        return boardListPS;
    }
}
