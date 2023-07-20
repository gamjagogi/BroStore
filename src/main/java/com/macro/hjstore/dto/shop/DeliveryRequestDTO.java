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
        private Integer discountPercentage;
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
}
