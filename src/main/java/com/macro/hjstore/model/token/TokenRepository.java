package com.macro.hjstore.model.token;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<RefreshTokenEntity,Long> {


}
