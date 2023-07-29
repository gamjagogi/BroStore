package com.macro.hjstore.dto.seller;

import com.macro.hjstore.model.seller.Seller;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class SellerDTO {

    @Getter
    public static class ResponseOrders{
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

        public ResponseOrders(Seller seller) {
            this.id = seller.getId();
            this.sellerUserId = seller.getSellerUserId();
            this.count = seller.getCount();
            this.productName = seller.getProductName();
            this.option = seller.getOption();
            this.productTotalPrice = seller.getProductTotalPrice();
            this.receiveAddress = seller.getReceiveAddress();
            this.customerEmail = seller.getCustomerEmail();
            this.customerTel = seller.getCustomerTel();
            this.orderCode = seller.getOrderCode();
            this.state = seller.isState();
        }
    }
}
