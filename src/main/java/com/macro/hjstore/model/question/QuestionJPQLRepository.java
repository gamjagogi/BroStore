package com.macro.hjstore.model.question;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.question.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class QuestionJPQLRepository {
    private final EntityManager em;
    private final int size = 8;

    public Page<Question> findAll(int page) {
        int startPosition = page*size;
        List<Question> boardListPS = em.createQuery("select b from Question b join fetch b.user order by b.id asc")
                .setFirstResult(startPosition) // startPosition
                .setMaxResults(size) // size
                .getResultList();
        Long totalCount = em.createQuery("select count(b) from Question b", Long.class).getSingleResult();
        return new PageImpl<>(boardListPS, PageRequest.of(page, size), totalCount);
    }

    public Page<Question> findAllByKeyword(int page, String keyword) {
        int startPosition = page*size;
        List<Question> boardListPS = em.createQuery("select b from Question b join fetch b.user where b.title like :keyword order by b.id desc")
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult(startPosition) // startPosition
                .setMaxResults(size) // size
                .getResultList();
        Long totalCount = em.createQuery("select count(b) from Question b where b.title like :keyword", Long.class)
                .setParameter("keyword", "%" + keyword + "%")
                .getSingleResult();
        return new PageImpl<>(boardListPS, PageRequest.of(page, size), totalCount);
    }


    public List<Question> findAllByKeyword(String keyword) {
        List<Question> questionListPS = em.createQuery("select b from Question b where b.title like :keyword or b.content like :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();
        return questionListPS;
    }
}