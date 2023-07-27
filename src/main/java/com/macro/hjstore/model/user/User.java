package com.macro.hjstore.model.user;

import com.macro.hjstore.model.cart.Cart;
import com.macro.hjstore.model.order.Order;
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
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,nullable = false, length = 20)
    private String email;

    @Column(name = "password", nullable = false, length = 60)
    private String password;

    @Column(name="profile", nullable = true)
    private String profile;


    // 기본 권한이 유저이다. 나중에 setRole()로 변경도 가능하다.
    @Column(name="role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "username",nullable = false, length = 20)
    private String username;

    @Column(name ="birth" ,nullable = false) //checkpoint : 생년월일 이대로해도되나!?
    private String birth;

    @Column(name = "status",nullable = false)
    private Boolean status; // true 계정활성화, false 계정비활성

    @Column(name = "provider", nullable = true)
    private String provider;

    @Column(name = "customer_key", nullable = true)
    private String customerKey;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id") // 무한 참조
    private Cart cart;


    public void changeProfile(String profile) {
        this.profile = profile;
    }

    public void changeEmail(String email) {
        this.email = email;
    }


    public void changePassword(String password) {
        this.password = password;
    }

    public void changeUsername(String username) {
        this.username = username;
    }

    public void resign() { // 탈퇴
        this.status = false;
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    @Builder
    public User(Long id, String email, String password, String profile, UserRole role, String username, String birth, Boolean status, String provider,String customerKey, LocalDateTime createdAt, LocalDateTime updatedAt, Cart cart) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.role = role;
        this.username = username;
        this.birth = birth;
        this.status = status;
        this.provider = provider;
        this.customerKey = customerKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.cart = cart;
    }
}
