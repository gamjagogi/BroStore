package com.macro.hjstore.model.deliveryProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface DeliveryRepository extends JpaRepository<Delivery,Long> {

    @Query("select b from Delivery b where b.id =:id")
    Optional<Delivery> findById(@Param("id") Long id);

    @Query("select b from Delivery b where b.category =:category order by b.id desc")
    List<Delivery> findByCategory(@Param("category") String category);

    @Query("select b from Delivery b where b.userId =:userId order by b.id desc")
    List<Delivery> findByUserId(@Param("userId")Long userId);

    @Query("select b from Delivery b order by b.id desc")
    List<Delivery>findByAllDesc();
}
