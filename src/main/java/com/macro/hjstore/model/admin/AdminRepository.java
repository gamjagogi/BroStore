package com.macro.hjstore.model.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AdminRepository extends JpaRepository<Admin,Long> {

    @Query("select a from Admin a where a.type = :type")
    List<Admin> findByAd(@Param("type")String type);

}
