package com.macro.hjstore.model.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

    @Query("select ci from CartItem ci where ci.cart.id = :cartId and ci.delivery.id = :deliveryId " )
    Optional<CartItem> findByCartIdAndItemId(@Param("cartId") Long cartId, @Param("deliveryId") Long deliveryId);

    @Query("select ci from CartItem ci where ci.cart.id = :cartId order by ci.id desc")
    List<CartItem> findByCartId(@Param("cartId") Long cartId);


}
