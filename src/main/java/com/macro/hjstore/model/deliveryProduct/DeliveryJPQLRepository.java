package com.macro.hjstore.model.deliveryProduct;

import com.macro.hjstore.model.board.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class DeliveryJPQLRepository {
    private final EntityManager em;

    public List<Delivery> findAllByKeyword(String keyword) {
        List<Delivery> deliveryListPS = em.createQuery("select b from Delivery b where b.name like :keyword or b.description like :keyword")
                .setParameter("keyword", "%" + keyword + "%")
                .getResultList();

        return deliveryListPS;
    }

//    public List<Delivery,Board> findBoardAndDeliveryByKeyword(String keyword) {
//        List<Delivery,Board> deliveryListPS = em.createQuery("select Delivery,Board from Board.title ,Delivery.name where Delivery.name like:keyword or Board.title like :keyword")
//                .setParameter("keyword", "%" + keyword + "%")
//                .getResultList();
//
//        return deliveryListPS;
//    }
}


