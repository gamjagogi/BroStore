package com.macro.hjstore.model.notice;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice,Long> {

    @Query("select b from Notice b join fetch b.user where b.id = :id")
    Optional<Notice> findByIdFetchUser(@Param("id") Long id);

    @Query("select b from Notice b order by b.id desc")
    List<Notice> findAllBySorted();
}
