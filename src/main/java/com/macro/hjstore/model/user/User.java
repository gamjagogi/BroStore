package com.macro.hjstore.model.user;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user_tb")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false, length = 20)
    private String email;

    @Column(nullable = false, length = 60)
    private String password;


    // 기본 권한이 유저이다. 나중에 setRole()로 변경도 가능하다.
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_USER;

    @Column(nullable = false, length = 20)
    private String username;

    @Column(nullable = false) //checkpoint : 생년월일 이대로해도되나!?
    private String birth;

    @Column(nullable = false)
    private Boolean status = true; // true 계정활성화, false 계정비활성

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

    @Builder
    public User(Long id, String email, String password, UserRole role, String username, String birth, Boolean status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.username = username;
        this.birth = birth;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
