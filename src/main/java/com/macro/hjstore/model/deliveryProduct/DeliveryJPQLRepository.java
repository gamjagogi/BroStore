package com.macro.hjstore.model.deliveryProduct;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Repository
public class DeliveryJPQLRepository {
    private final EntityManager em;
}