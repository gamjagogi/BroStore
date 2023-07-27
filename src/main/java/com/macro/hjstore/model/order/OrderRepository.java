package com.macro.hjstore.model.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query("select o from Order o where o.userEmail =:userEmail")
    List<Order> findByUserEmail(@Param("userEmail") String userEmail);


    @Query("select o from Order o where o.orderCode =:orderCode")
    Optional<Order> findByOrderId(@Param("orderCode") String orderCode);


}
