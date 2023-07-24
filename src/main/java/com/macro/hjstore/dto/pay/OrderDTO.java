package com.macro.hjstore.dto.pay;


import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.user.User;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

public class OrderDTO {


    @Getter
    public static class BeforePay{

        private List<OrderItem> itemList;

        private Integer orderPrice;

        private String receiveAddress;

        private String userName;

        private String tel;

        public Order toEntity(User user){

            String orderId = "ID_"+UUID.randomUUID().toString();

            String name = this.itemList.get(0).name;
            System.out.println("orderDTO에서 첫번째 아이템이름:"+name);
            Integer itemCount = this.itemList.size();
            String orderName = name+" 외, "+itemCount+"개";


            Order orderPS = Order.builder()
                    .orderId(orderId)
                    .orderName(orderName)
                    .user(user)
                    .build();
            return orderPS;
        }
    }

    @Getter
    public static class OrderItem{

        private Long id;

        private String sku;

        private String link;

        private String name; // 상품 명
        private String thumbnail;

        private Integer price;
        private Integer originPrice;
        private Integer discountPrice;
        private Integer discountPercentage;
        private boolean isNew;
        private boolean isHot;
        private Integer star;
        private boolean isFreeShipping;

        private String description;

        private String soldBy;

        private String category;

        private Long cartItemId;

        private Integer count; // cartItem 갯수(장바구니 상품 갯수)
    }
}
