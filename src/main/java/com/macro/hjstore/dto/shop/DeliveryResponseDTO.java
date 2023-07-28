package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.softwareProduct.Software;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class DeliveryResponseDTO {
    @NotEmpty
    private Long id;

    private String sku;

    private String link;

    @NotEmpty
    private String name;
    private String thumbnail;

    private Integer price;
    private Integer originPrice;
    private Integer discountPrice;
    private Integer discountPercentage;
    private boolean isNew;
    private boolean isHot;
    private Integer star;
    private boolean isFreeShipping;
    @NotEmpty
    private String description;
    private String highlights;
    private String soldBy;

    private String category;

    public DeliveryResponseDTO(Delivery delivery){
        this.id = delivery.getId();
        this.sku = delivery.getSku();
        this.link = delivery.getLink();
        this.name = delivery.getName();
        this.thumbnail = delivery.getThumbnail();
        this.price = delivery.getPrice();
        this.originPrice = delivery.getOriginPrice();
        this.discountPrice = delivery.getDiscountPrice();
        this.discountPercentage = delivery.getDiscountPercentage();
        this.isNew = delivery.isNew();
        this.isHot = delivery.isHot();
        this.star = delivery.getStar();
        this.isFreeShipping = delivery.isFreeShipping();
        this.description = delivery.getDescription();
        this.highlights = delivery.getHighlights();
        this.soldBy = delivery.getSoldBy();
        this.category = delivery.getCategory();
    }
    @Getter
    public static class Detail{
        @NotEmpty
        private Long id;

        @NotEmpty
        private String name;

        private String thumbnail;
        private String img;
        @NotEmpty
        private Integer price;
        private Integer originPrice;
        private Integer discountPrice;
        private Integer discountPercentage;
        private boolean isNew;
        private boolean isHot;
        private Integer star;
        private boolean isFreeShipping;
        private String highlights;
        @NotEmpty
        private String description;

        private String soldBy;

        private String category;

        public Detail(Delivery delivery){
            this.id = delivery.getId();
            this.name = delivery.getName();
            this.thumbnail = delivery.getThumbnail();
            this.img = delivery.getImg();
            this.price = delivery.getPrice();
            this.originPrice = delivery.getOriginPrice();
            this.discountPrice = delivery.getDiscountPrice();
            this.discountPercentage = delivery.getDiscountPercentage();
            this.isNew = delivery.isNew();
            this.isHot = delivery.isHot();
            this.star = delivery.getStar();
            this.isFreeShipping = delivery.isFreeShipping();
            this.highlights = delivery.getHighlights();
            this.description = delivery.getDescription();
            this.soldBy = delivery.getSoldBy();
            this.category = delivery.getCategory();
        }
    }

    @Getter
    public static class DeliveryCartItem{
        @NotEmpty
        private Long id;

        private String sku;

        private String link;

        @NotEmpty
        private String name;
        private String thumbnail;

        private Integer price;
        private Integer originPrice;
        private Integer discountPrice;
        private Integer discountPercentage;
        private boolean isNew;
        private boolean isHot;
        private Integer star;
        private boolean isFreeShipping;
        @NotEmpty
        private String description;

        private String soldBy;

        private String category;

        private Long cartItemId;

        private Integer count; // cartItem 갯수(장바구니 상품 갯수)


        public DeliveryCartItem(Delivery delivery,Long cartItemId, Integer count){
            this.id = delivery.getId();
            this.sku = delivery.getSku();
            this.link = delivery.getLink();
            this.name = delivery.getName();
            this.thumbnail = delivery.getThumbnail();
            this.price = delivery.getPrice();
            this.originPrice = delivery.getOriginPrice();
            this.discountPrice = delivery.getDiscountPrice();
            this.discountPercentage = delivery.getDiscountPercentage();
            this.isNew = delivery.isNew();
            this.isHot = delivery.isHot();
            this.star = delivery.getStar();
            this.isFreeShipping = delivery.isFreeShipping();
            this.description = delivery.getDescription();
            this.soldBy = delivery.getSoldBy();
            this.category = delivery.getCategory();
            this.cartItemId = cartItemId;
            this.count = count;
        }
    }
}
