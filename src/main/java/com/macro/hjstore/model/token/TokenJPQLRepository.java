package com.macro.hjstore.model.token;

import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class TokenJPQLRepository {
    private final EntityManager em;

    public Optional<User> findByUuid(String uuid) {
        TypedQuery<User> query = em.createQuery("SELECT t.user FROM RefreshTokenEntity t WHERE t.uuid = :uuid", User.class);
        query.setParameter("uuid", uuid);
        return query.getResultStream().findFirst();
    }
}
