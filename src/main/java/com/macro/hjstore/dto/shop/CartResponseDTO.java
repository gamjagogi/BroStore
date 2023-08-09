package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.cart.CartItem;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.user.User;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Getter
public class CartResponseDTO {

    private List<DeliveryResponseDTO.DeliveryCartItem> deliveryList = new ArrayList<>();

    private Integer totalPrice;

    private Integer totalCount;

    private Long userId;

    private String userName;

    private String tel;

    private String address;

    private String detailAddress;

    public CartResponseDTO(List<CartItem> cartItemList, Integer totalPrice, Integer totalCount, User user){

        for(CartItem cartItem: cartItemList){
            System.out.println(cartItem.getDelivery().getName());

            DeliveryResponseDTO.DeliveryCartItem deliveryCartItem = new DeliveryResponseDTO.DeliveryCartItem(cartItem.getDelivery(),cartItem.getId(),cartItem.getCount());
            this.deliveryList.add(deliveryCartItem);
        }
        this.totalPrice = totalPrice;
        this.totalCount = totalCount;
        this.userId = user.getId();
        this.userName = user.getUsername();
        this.tel = user.getTel();
        this.address = user.getAddress();
        this.detailAddress = user.getDetailAddress();
    }

}
