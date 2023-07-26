package com.macro.hjstore.model.order;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@Getter
@Entity
@Table(name = "order_tb")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderCode")
    private String orderCode;
    @Column(name = "orderName")
    private String orderName;

    @Column(name = "username")
    private String userName;

    @Column(name = "userEmail")
    private String userEmail;

    @Column(name = "tel")
    private String tel;

    @Column(name = "address")
    private String receiveAddress;

    @Column(name = "price")
    private Integer orderPrice;

    @Column(name = "state")
    private boolean state;


    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public Order(Long id, String orderCode, String orderName, String userName,String email, String tel, String receiveAddress, Integer orderPrice, boolean state,LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = email;
        this.tel = tel;
        this.receiveAddress = receiveAddress;
        this.orderPrice = orderPrice;
        this.state = state;
        this.createdAt = createdAt;
    }
}
