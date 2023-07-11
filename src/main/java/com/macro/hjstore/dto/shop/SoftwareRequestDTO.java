package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.softwareProduct.Software;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;


public class SoftwareRequestDTO {

    @Getter
    public static class Save{

        @NotEmpty
        private String sku;

        @NotEmpty
        private String name;
        private String img;
        @NotEmpty
        private int price;
        private int originPrice;
        private int discountPrice;
        private int discountPercentage;
        private boolean isNew;
        private boolean isHot;
        private int star;
        private boolean isFreeShipping;
        private String highlights;
        @NotEmpty
        private String description;

    }
}
