package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.softwareProduct.Software;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class SoftwareResponseDTO {
    @NotEmpty
    private Long id;

    @NotEmpty
    private String sku;

    @NotEmpty
    private String link; // 해당 product의 상세보기 링크
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
    @NotEmpty
    private String description;


    public SoftwareResponseDTO(Software software){
        this.id = software.getId();
        this.link = software.getLink();
        this.sku = software.getSku();
        this.name = software.getName();
        this.img = software.getImg();
        this.price = software.getPrice();
        this.originPrice = software.getOriginPrice();
        this.discountPrice = software.getDiscountPrice();
        this.discountPercentage = software.getDiscountPercentage();
        this.isNew = software.isNew();
        this.isHot = software.isHot();
        this.star = software.getStar();
        this.isFreeShipping = software.isFreeShipping();
        this.description = software.getDescription();
    }
    @Getter
    public static class Detail{
        @NotEmpty
        private Long id;

        @NotEmpty
        private String sku;

        @NotEmpty
        private String link; // 해당 product의 상세보기 링크
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

        public Detail(Software software){
            this.id = software.getId();
            this.link = software.getLink();
            this.sku = software.getSku();
            this.name = software.getName();
            this.img = software.getImg();
            this.price = software.getPrice();
            this.originPrice = software.getOriginPrice();
            this.discountPrice = software.getDiscountPrice();
            this.discountPercentage = software.getDiscountPercentage();
            this.isNew = software.isNew();
            this.isHot = software.isHot();
            this.star = software.getStar();
            this.isFreeShipping = software.isFreeShipping();
            this.highlights = software.getHighlights();
            this.description = software.getDescription();
        }
    }
}
