package com.macro.hjstore.dto.admin;

import com.macro.hjstore.model.admin.Admin;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class AdminDTO {

    @Getter
    @AllArgsConstructor
    public static class SetAd{

        private String image;

        private String url;

        private String title;

        private String description;

    }

    @Getter
    public static class GetAd{

        private Long adId;

        private String img;

        private String to;

        private String title;

        private String description;

        public GetAd(Admin admin){
            this.adId = admin.getId();
            this.img = admin.getImage();
            this.to = admin.getUrl();
            this.title = admin.getTitle();
            this.description = admin.getDescription();
        }
    }

}
