package com.macro.hjstore.model.deliveryProduct;

import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Optional;
// 저장할 필요가 있는건 tb로 만든다.


@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "delivery_tb")
@Entity
public class Delivery {

    @Id
    @Column(name = "delivery_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sku", nullable = true, length = 30)
    private String sku = "FAS-01";


    @Column(name = "title",nullable = false, length = 60)
    private String name;

    private String link = "/delivery/";


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

    @Column(name = "discountPercentage",nullable = true)
    private Integer discountPercentage;

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

    @Column(name = "soldBy")
    private String soldBy;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "category")
    private String category;


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
    public Delivery(Long id, String sku, String name,Long userId, String thumbnail, String img, Integer price, Integer originPrice, Integer discountPrice, Integer discountPercentage, boolean isNew, boolean isHot, Integer star, boolean isFreeShipping, String highlights, String description, String soldBy, String category, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.thumbnail = thumbnail;
        this.img = img;
        this.price = price;
        this.originPrice = originPrice;
        this.discountPrice = discountPrice;
        this.discountPercentage = discountPercentage;
        this.isNew = isNew;
        this.isHot = isHot;
        this.star = star;
        this.isFreeShipping = isFreeShipping;
        this.highlights = highlights;
        this.description = description;
        this.soldBy = soldBy;
        this.userId = userId;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getter 메서드
    public Integer getPrice() {
        return Optional.ofNullable(price).orElse(0);
    }

    public static Delivery toEntity(Long id,DeliveryRequestDTO.Save savePS) {
        Delivery deliveryPS = Delivery.builder()
                .name(savePS.getTitle())
                .thumbnail(savePS.getImagePreview())
                .price(savePS.getPrice())
                .originPrice(savePS.getOriginPrice())
                .discountPrice(savePS.getDiscountPrice())
                .discountPercentage(savePS.getDiscountPercentage())
                .isNew(savePS.isNew())
                .isHot(savePS.isHot())
                .star(savePS.getStar())
                .isFreeShipping(savePS.isDeliveryFree())
                .highlights(savePS.getHighlights())
                .description(savePS.getDescription())
                .soldBy(savePS.getSoldBy())
                .userId(id)
                .category(savePS.getCategory())
                .build();
        return deliveryPS;
    }

    public Delivery update(Long userId,DeliveryRequestDTO.Update updatePS){
        this.name = updatePS.getTitle();
        this.thumbnail = updatePS.getImagePreview();
        this.price = updatePS.getPrice();
        this.originPrice = updatePS.getOriginPrice();
        this.discountPrice = updatePS.getDiscountPrice();
        this.discountPercentage = updatePS.getDiscountPercentage();
        this.isHot = updatePS.isHot();
        this.isNew = updatePS.isNew();
        this.star = updatePS.getStar();
        this.isFreeShipping = updatePS.isDeliveryFree();
        this.highlights = updatePS.getHighlights();
        this.description = updatePS.getDescription();
        this.soldBy = updatePS.getSoldBy();
        this.userId = userId;
        this.category = updatePS.getCategory();
        return this;
    }
}
