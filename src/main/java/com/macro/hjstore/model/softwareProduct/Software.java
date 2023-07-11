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
    private String sku;

    @Column( name = "link",nullable = false)
    private String link; // 해당 product의 상세보기 링크

    @Column(name = "title",nullable = false, length = 60)
    private String name;

    @Column(name = "img",nullable = true)
    private String img;

    @Column(name = "price",nullable = false)
    private int price;

    @Column(name = "originPrice",nullable = true)
    private int originPrice;

    @Column(name = "discountPrice",nullable = true)
    private int discountPrice;

    @Column(name = "discountPercentage",nullable = true)
    private int discountPercentage;

    @Column(name = "isNew",nullable = true)
    private boolean isNew;

    @Column(name = "isHot",nullable = true)
    private boolean isHot;

    @Column(name = "star",nullable = true)
    private int star;

    @Column(name = "isFreeShipping",nullable = true)
    private boolean isFreeShipping;

    @Column(name = "highlights", nullable = true)
    private String highlights;

    @Lob
    @Column(name = "description",nullable = false)
    private String description;


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
    public Software(Long id, String sku, String link, String name, String img, int price, int originPrice, int discountPrice, int discountPercentage, boolean isNew, boolean isHot, int star, boolean isFreeShipping,String highlights ,String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.sku = sku;
        this.link = link;
        this.name = name;
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
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Software toEntity(SoftwareRequestDTO.Save savePS) {
        Software softwarePS = Software.builder()
                .sku(savePS.getSku())
                .name(savePS.getName())
                .img(savePS.getImg())
                .price(savePS.getPrice())
                .originPrice(savePS.getOriginPrice())
                .discountPrice(savePS.getDiscountPrice())
                .discountPercentage(savePS.getDiscountPercentage())
                .isNew(savePS.isNew())
                .isHot(savePS.isHot())
                .star(savePS.getStar())
                .isFreeShipping(savePS.isFreeShipping())
                .highlights(savePS.getHighlights())
                .description(savePS.getDescription())
                .build();
        return softwarePS;
    }

    public void setLink(String link){
        this.link = link;
    }
}
