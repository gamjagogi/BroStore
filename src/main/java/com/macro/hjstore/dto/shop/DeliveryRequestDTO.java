package com.macro.hjstore.dto.shop;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;


public class DeliveryRequestDTO {

    @Getter
    public static class Save{

        @NotEmpty
        private String title;
        private String imagePreview;
        private Integer price;
        private Integer originPrice;
        private Integer discountPrice;
        private Integer discountPercent;
        private boolean isNew;
        private boolean isHot;
        private Integer star;
        private boolean deliveryFree;
        private String highlights;
        @NotEmpty
        private String description;

        private String soldBy;

        private String category;
    }

    @Getter
    public static class Update{

        @NotEmpty
        private String title;
        private String imagePreview;
        private Integer price;
        private Integer originPrice;
        private Integer discountPrice;
        private Integer discountPercent;
        private boolean isNew;
        private boolean isHot;
        private Integer star;
        private boolean deliveryFree;
        private String highlights;
        @NotEmpty
        private String description;

        private String soldBy;

        private String category;

        private Long productId;

        public Update(Long productId, String title, String imagePreview, Integer price, Integer originPrice, Integer discountPrice, Integer discountPercent, boolean isNew, boolean isHot, Integer star, boolean deliveryFree, String highlights, String description, String soldBy, String category) {
            this.productId = productId;
            this.title = title;
            this.imagePreview = imagePreview;
            this.price = price;
            this.originPrice = originPrice;
            this.discountPrice = discountPrice;
            this.discountPercent = discountPercent;
            this.isNew = isNew;
            this.isHot = isHot;
            this.star = star;
            this.deliveryFree = deliveryFree;
            this.highlights = highlights;
            this.description = description;
            this.soldBy = soldBy;
            this.category = category;
        }
    }
}
