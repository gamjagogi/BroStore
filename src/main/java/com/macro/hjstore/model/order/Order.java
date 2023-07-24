package com.macro.hjstore.model.order;

import com.macro.hjstore.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public Order(Long id, String orderId, String orderName,User user) {
        this.id = id;
        this.orderId = orderId;
        this.orderName = orderName;
        this.user = user;
    }
}
