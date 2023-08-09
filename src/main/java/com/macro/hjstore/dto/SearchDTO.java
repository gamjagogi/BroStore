package com.macro.hjstore.dto;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import lombok.Getter;

public class SearchDTO {

    @Getter
    public static class Response{

        private String thumbnail;

        private String title;

        private String content;

        private String by;

        private String link;

        private Long id;

        public Response(Delivery delivery){
            this.thumbnail = delivery.getThumbnail();
            this.title = delivery.getName();
            this.content = delivery.getDescription();
            this.by = delivery.getSoldBy();
            this.link = delivery.getLink();
            this.id = delivery.getId();
        }

        public Response(Board board){
            this.thumbnail = board.getThumbnail();
            this.title = board.getTitle();
            this.content = board.getContent();
            this.by = board.getUser().getUsername();
            this.link = board.getLink();
            this.id = board.getId();
        }
    }
}
