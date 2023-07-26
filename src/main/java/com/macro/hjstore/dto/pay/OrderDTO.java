package com.macro.hjstore.dto.pay;


import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

        public Order toEntity(String userEmail){

            // 주문 id
            String orderCode = "ID_"+UUID.randomUUID().toString();
            System.out.println(orderCode);

            String name = this.itemList.get(0).name;
            System.out.println("orderDTO에서 첫번째 아이템이름:"+name);
            Integer itemCount = this.itemList.size() -1;
            // 주문 명
            String orderName = name+" 외, "+itemCount+"개";


            Order orderPS = Order.builder()
                    .orderCode(orderCode)
                    .orderName(orderName)
                    .userName(this.userName)
                    .userEmail(userEmail)
                    .tel(this.tel)
                    .receiveAddress(this.receiveAddress)
                    .orderPrice(this.orderPrice)
                    .state(true)
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

    @Getter
    public static class ResponseOrderSheet{

        private String orderCode;

        private String orderName;

        private String customerName;

        private String customerEmail;

        private Integer price;

        public ResponseOrderSheet(Order order){

            this.orderCode = order.getOrderCode();
            this.orderName = order.getOrderName();
            this.customerName = order.getUserName();
            this.customerEmail = order.getUserEmail();
            this.price = order.getOrderPrice();
        }
    }
}
