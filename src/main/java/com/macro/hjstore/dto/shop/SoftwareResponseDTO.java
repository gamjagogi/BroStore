package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.softwareProduct.Software;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class SoftwareResponseDTO {
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


    public SoftwareResponseDTO(Software software){
        this.id = software.getId();
        this.sku = software.getSku();
        this.link = software.getLink();
        this.name = software.getName();
        this.thumbnail = software.getThumbnail();
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

        public Detail(Software software){
            this.id = software.getId();
            this.name = software.getName();
            this.thumbnail = software.getThumbnail();
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
