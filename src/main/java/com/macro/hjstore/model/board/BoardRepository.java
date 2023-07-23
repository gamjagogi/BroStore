package com.macro.hjstore.model.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface BoardRepository extends JpaRepository<Board,Long> {

    @Query("select b from Board b join fetch b.user where b.id = :id")
    Optional<Board> findByIdFetchUser(@Param("id") Long id);

    @Query("select b from Board b order by b.id asc")
    List<Board> findAllBySorted();

}
