package com.macro.hjstore.model.softwareProduct;

import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.model.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

// 저장할 필요가 있는건 tb로 만든다.


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "software_tb")
@Entity
public class Software {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sku", nullable = true, length = 30)
    private String sku = "FAS-01";


    @Column(name = "title",nullable = false, length = 60)
    private String name;

    private String link = "/software/";


    @Column(name = "thumbnail", nullable = true)
    private String thumbnail;

    @Column(name = "img",nullable = true)
    private String img;

    @Column(name = "price",nullable = true)
    private Integer price;

    @Column(name = "originPrice",nullable = true)
    private Integer originPrice;

    @Column(name = "discountPrice",nullable = true)
    private Integer discountPrice;

    @Column(name = "discountPercent",nullable = true)
    private Integer discountPercent;

    @Column(name = "isNew",nullable = true)
    private boolean isNew;

    @Column(name = "isHot",nullable = true)
    private boolean isHot;

    @Column(name = "star",nullable = true)
    private Integer star;


    @Column(name = "isFreeShipping",nullable = true)
    private boolean isFreeShipping;


    @Column(name = "highlights", nullable = true)
    private String highlights;

    @Lob
    @Column(name = "description",nullable = false)
    private String description;

    private String uploadFile;

    @Column(name = "soldBy")
    private String soldBy;

    @Column(name = "category")
    private String category;

    private Long userId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }


    @Builder
    public Software(Long id, String name, String thumbnail, String img, Integer price, Integer originPrice, Integer discountPrice, Integer discountPercent, boolean isNew, boolean isHot, Integer star, boolean isFreeShipping, String highlights, String description,String uploadFile ,String soldBy, String category, Long userId,LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.img = img;
        this.price = price;
        this.originPrice = originPrice;
        this.discountPrice = discountPrice;
        this.discountPercent = discountPercent;
        this.isNew = isNew;
        this.isHot = isHot;
        this.star = star;
        this.isFreeShipping = isFreeShipping;
        this.highlights = highlights;
        this.description = description;
        this.uploadFile = uploadFile;
        this.soldBy = soldBy;
        this.category = category;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Software toEntity(Long userId,SoftwareRequestDTO.Save savePS) {
        Software softwarePS = Software.builder()
                .name(savePS.getTitle())
                .thumbnail(savePS.getImagePreview())
                .price(savePS.getPrice())
                .originPrice(savePS.getOriginPrice())
                .discountPrice(savePS.getDiscountPrice())
                .discountPercent(savePS.getDiscountPercent())
                .isNew(savePS.isNew())
                .isHot(savePS.isHot())
                .star(savePS.getStar())
                .isFreeShipping(savePS.isDeliveryFree())
                .highlights(savePS.getHighlights())
                .description(savePS.getDescription())
                .soldBy(savePS.getSoldBy())
                .category(savePS.getCategory())
                .uploadFile(savePS.getUploadFile())
                .userId(userId)
                .build();
        return softwarePS;
    }

}
