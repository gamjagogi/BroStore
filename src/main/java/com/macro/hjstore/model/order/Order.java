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

    @Column(name = "orderId",nullable = false)
    private String orderId;
    @Column(name = "orderName")
    private String orderName;

    @Column(name = "username")
    private String userName;

    @Column(name = "email")
    private String userEmail;

    @Column(name = "tel")
    private String tel;

    @Column(name = "address")
    private String receiveAddress;

    @Column(name = "price")
    private Integer orderPrice;




    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public Order(Long id, String orderId, String orderName, String userName,String email, String tel, String receiveAddress, Integer orderPrice, LocalDateTime createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = email;
        this.tel = tel;
        this.receiveAddress = receiveAddress;
        this.orderPrice = orderPrice;
        this.createdAt = createdAt;
    }
}
