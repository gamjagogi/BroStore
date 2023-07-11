package com.macro.hjstore.model.token;

import com.macro.hjstore.model.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "token_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false, unique = true)
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TokenStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }


    public RefreshTokenEntity(User user, String uuid, TokenStatus status) {
        this.user = user;
        this.uuid = uuid;
        this.status = status;
    }

    public void setStatus(TokenStatus expired){
        this.status = expired;
    }
}
