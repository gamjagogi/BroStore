package com.macro.hjstore.model.deliveryProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface DeliveryRepository extends JpaRepository<Delivery,Long> {

    @Query("select b from Delivery b where b.id =:id")
    Optional<Delivery> findById(@Param("id") Long id);

    @Query("select b from Delivery b where b.category =:category")
    List<Delivery> findByCategory(@Param("category") String category);

    @Query("select b from Delivery b where b.userId =:userId")
    List<Delivery> findByUserId(@Param("userId")Long userId);
}
