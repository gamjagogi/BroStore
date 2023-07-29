package com.macro.hjstore.model.seller;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;


@NoArgsConstructor
@Getter
@Entity
@Table(name = "seller_tb")
public class Seller {

    @Id
    @Column(name ="seller_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sellerUserId;

    private Integer count;

    private String productName;

    private String option;

    private Integer productTotalPrice;

    private String receiveAddress;

    private String customerEmail;

    private String customerTel;

    private String orderCode;

    private boolean state;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    public void setState(boolean state){
        this.state = state;
    }

    @Builder
    public Seller(Long sellerUserId, Integer count, Integer productTotalPrice,boolean state,String receiveAddress,String customerEmail,String customerTel, String orderCode,String productName, String option) {
        this.sellerUserId = sellerUserId;
        this.count = count;
        this.productTotalPrice = productTotalPrice;
        this.state = state;
        this.receiveAddress = receiveAddress;
        this.customerEmail = customerEmail;
        this.customerTel = customerTel;
        this.orderCode = orderCode;
        this.productName = productName;
    }
}
