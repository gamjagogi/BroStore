package com.macro.hjstore.model.admin;

import com.macro.hjstore.dto.admin.AdminDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "admin_tb")
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image;

    private String url;

    private String title;

    private String description;

    private String type;

    @Builder
    public Admin(Long id, String image, String url, String title, String description, String type) {
        this.id = id;
        this.image = image;
        this.url = url;
        this.title = title;
        this.description = description;
        this.type = type;
    }


    public Admin(AdminDTO.SetAd setSlide,String type){
        this.image = setSlide.getImage();
        this.url = setSlide.getUrl();
        this.title = setSlide.getTitle();
        this.description = setSlide.getDescription();
        this.type = type;
    }

}
