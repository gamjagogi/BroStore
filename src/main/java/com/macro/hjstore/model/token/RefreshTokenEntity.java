package com.macro.hjstore.model.token;

import com.macro.hjstore.model.user.User;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "token_tb")
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_tb")
    private User user;

    @Column(nullable = false, unique = true)
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TokenStatus status;

    public RefreshTokenEntity() {}

    public RefreshTokenEntity(User user, String uuid, TokenStatus status) {
        this.user = user;
        this.uuid = uuid;
        this.status = status;
    }

    public void setStatus(TokenStatus expired){
        this.status = expired;
    }
}
