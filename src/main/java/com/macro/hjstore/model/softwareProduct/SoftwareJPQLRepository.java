package com.macro.hjstore.model.softwareProduct;

import com.macro.hjstore.model.board.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class SoftwareJPQLRepository {
    private final EntityManager em;

    public List<Software> findAllByKeyword(String keyword) {
        List<Software> boardListPS = em.createQuery("select b from Software b where b.name like :keyword or b.description like :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();
        return boardListPS;
    }
}