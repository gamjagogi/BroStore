package com.macro.hjstore.dto.pay;


import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;
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

        public OrderItem(Long id, String sku, String link, String name, String thumbnail, Integer price, Integer originPrice, Integer discountPrice, Integer discountPercentage, boolean isNew, boolean isHot, Integer star, boolean isFreeShipping, String description, String soldBy, String category, Long cartItemId, Integer count) {
            this.id = id;
            this.sku = sku;
            this.link = link;
            this.name = name;
            this.thumbnail = thumbnail;
            this.price = price;
            this.originPrice = originPrice;
            this.discountPrice = discountPrice;
            this.discountPercentage = discountPercentage;
            this.isNew = isNew;
            this.isHot = isHot;
            this.star = star;
            this.isFreeShipping = isFreeShipping;
            this.description = description;
            this.soldBy = soldBy;
            this.category = category;
            this.cartItemId = cartItemId;
            this.count = count;
        }
    }

    @Getter
    public static class ResponseOrderSheet{ // 결제 중 필요한 주문내역

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
    @Getter
    public static class ResponseOrders{ // 유저가 주문내역 확인을 할떄 필요한 응답
        private Long id;

        private String orderCode;

        private String orderName;

        private String userName;

        private String userEmail;

        private String tel;

        private String receiveAddress;

        private Integer orderPrice;

        private boolean state;

        private LocalDateTime createdAt;

        public ResponseOrders(Order order) {
            this.id = order.getId();
            this.orderCode = order.getOrderCode();
            this.orderName = order.getOrderName();
            this.userName = order.getUserName();
            this.userEmail = order.getUserEmail();
            this.tel = order.getTel();
            this.receiveAddress = order.getReceiveAddress();
            this.orderPrice = order.getOrderPrice();
            this.state = order.isState();
            this.createdAt = order.getCreatedAt();
        }
    }

    @Getter
    public static class DeleteOrder{

        private String orderId;

        public DeleteOrder(String orderId) {
            this.orderId = orderId;
        }
    }
}
