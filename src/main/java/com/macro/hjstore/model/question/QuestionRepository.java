package com.macro.hjstore.model.question;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query("select b from Question b join fetch b.user where b.id = :id")
    Optional<Question> findByIdFetchUser(@Param("id") Long id);

    @Query("select b from Question b order by b.id desc")
    List<Question> findAllBySorted();

    @Query("select b from Question b where b.category =:category order by b.id desc ")
    List<Question> findByCategory(@Param("category") String category);

}
