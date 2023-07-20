package com.macro.hjstore.model.softwareProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface SoftwareRepository extends JpaRepository<Software,Long> {

    @Query("select b from Software b where b.id =:id")
    Optional<Software> findById(@Param("id") Long id);

    @Query("select b from Software b where b.category =:category")
    List<Software> findByCategory(@Param("category") String category);

}
