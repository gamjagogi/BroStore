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

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "detail_address", nullable = true)
    private String detailAddress;

    @Column(name = "full_address", nullable = true)
    private String pullAddress = address +" "+detailAddress;

    @Column(name = "phone_number", nullable = true)
    private String tel;

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


    public void changePassword(String password) {
        this.password = password;
    }


    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }


    public void updateName(String username){
        this.username = username;
    }

    public void updateBirth(String birth){
        this.birth = birth;
    }

    public void updateAddress(String address,String detailAddress){
        this.address = address;
        this.detailAddress = detailAddress;
    }

    public void updateTel(String tel){
        this.tel = tel;
    }

    @Builder
    public User(Long id, String email, String password, String profile, UserRole role, String username, String birth, Boolean status, String provider,String customerKey,String address,String detailAddress ,String tel ,LocalDateTime createdAt, LocalDateTime updatedAt, Cart cart) {
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
        this.address = address;
        this.detailAddress = detailAddress;
        this.tel = tel;
        this.cart = cart;
    }
}
