package com.macro.hjstore.model.seller;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller,Long> {

    @Query("select s from Seller s where s.sellerUserId =:sellerUserId")
    List<Seller> findBySellerId(@Param("sellerUserId") Long sellerUserId);
}
