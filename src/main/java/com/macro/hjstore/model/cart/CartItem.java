package com.macro.hjstore.model.cart;

import com.macro.hjstore.model.deliveryProduct.Delivery;
import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cart_item_tb")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="delivery_id")
    private Delivery delivery;

    @Column(name = "count")
    private Integer count; // 상품 개수

    public static CartItem createCartItem(Cart cart, Delivery delivery, Integer amount) {
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setDelivery(delivery);
        cartItem.setCount(amount);
        return cartItem;
    }

    // 이미 담겨있는 물건 또 담을 경우 수량 증가
    public void addCount(Integer count) {
        this.count += count;
    }

}