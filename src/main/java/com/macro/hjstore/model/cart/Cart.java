package com.macro.hjstore.model.cart;

import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.seller.Seller;
import com.macro.hjstore.model.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cart_tb")
public class Cart {


    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id") // 무한 참조
    private User user; // 구매자

    @Column(name = "count")
    private Integer count; // 카트에 담긴 총 상품 개수

    @OneToMany(mappedBy = "cart",fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setCount(0);
        cart.setUser(user);
        return cart;
    }

    public List<Seller> orderList(Order order){
        List<Seller>orders = this.cartItems
                .stream().map(cartItem -> new Seller(
                        cartItem.getDelivery().getUserId()
                        ,cartItem.getCount()
                        ,cartItem.getDelivery().getPrice()*cartItem.getCount()
                        ,true
                        ,order.getReceiveAddress()
                        ,order.getUserEmail()
                        ,order.getTel()
                        ,order.getOrderCode()
                        ,cartItem.getDelivery().getName()
                        ,cartItem.getOption()))
                .collect(Collectors.toList());
        return orders;
    }

}