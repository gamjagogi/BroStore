package com.macro.hjstore.dto.shop;

import com.macro.hjstore.model.softwareProduct.Software;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotEmpty;


public class SoftwareRequestDTO {

    @Getter
    @AllArgsConstructor
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
    @AllArgsConstructor
    public static class Update{

        private Long softwareId;

        @NotEmpty
        private String title;

        private String highlights;

        @NotEmpty
        private String description;

        private String imagePreview;

        private boolean isNew;

        private boolean isHot;

        private Integer star;

        private Integer price;

        private Integer originPrice;

        private Integer discountPrice;

        private String soldBy;

        private String category;

        private Integer discountPercent;

        public Software toEntity(Software software){
            return Software.builder()
                    .id(softwareId)
                    .name(title)
                    .highlights(highlights)
                    .description(description)
                    .thumbnail(imagePreview)
                    .isNew(isNew)
                    .isHot(isHot)
                    .star(star)
                    .price(price)
                    .originPrice(originPrice)
                    .discountPrice(discountPrice)
                    .soldBy(soldBy)
                    .category(category)
                    .discountPercent(discountPercent)
                    .userId(software.getUserId())
                    .createdAt(software.getCreatedAt())
                    .build();
        }
    }
}
