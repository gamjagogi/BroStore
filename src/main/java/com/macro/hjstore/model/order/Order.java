package com.macro.hjstore.model.order;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@NoArgsConstructor
@Getter
@Entity
@Table(name = "order_tb")
public class Order {

    @Id
    @Column(name ="order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private OrderStatus status;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    public void setState(boolean state){
        this.state = state;
    }

    public void setStatus(OrderStatus status){
        this.status = status;
    }

    @Builder
    public Order(Long id, String orderCode, String orderName, String userName,String userEmail, String tel, String receiveAddress, Integer orderPrice,OrderStatus orderStatus, boolean state,LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.orderName = orderName;
        this.userName = userName;
        this.userEmail = userEmail;
        this.tel = tel;
        this.receiveAddress = receiveAddress;
        this.orderPrice = orderPrice;
        this.status = orderStatus;
        this.state = state;
        this.createdAt = createdAt;
    }
}
