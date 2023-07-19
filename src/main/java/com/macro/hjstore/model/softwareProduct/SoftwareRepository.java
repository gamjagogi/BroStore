package com.macro.hjstore.model.softwareProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface SoftwareRepository extends JpaRepository<com.macro.hjstore.model.softwareProduct.Software,Long> {

    @Query("select b from Software b where b.id =:id")
    Optional<com.macro.hjstore.model.softwareProduct.Software> findById(@Param("id") Long id);

}
