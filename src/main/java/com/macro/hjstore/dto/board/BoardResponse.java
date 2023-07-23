package com.macro.hjstore.dto.board;

import com.macro.hjstore.model.board.Board;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class BoardResponse {

    @Getter
    @Setter
    public static class DetailDTO{

        @NotEmpty
        @Size( max = 60)
        private String title;

        @NotEmpty
        private String content;

        private String thumbnail;

        private String username;

        public DetailDTO(String title, String content, String thumbnail, String username) {
            this.title = title;
            this.content = content;
            this.thumbnail = thumbnail;
            this.username = username;
        }
    }
    @Getter
    public static class UserBoard {

        @NotEmpty
        private Long id;
        @NotEmpty
        @Size( max = 60)
        private String title;

        @NotEmpty
        private String content;

        private String thumbnail;

        private String username;

        public UserBoard(Board board) {
            this.id = board.getId();
            this.title = board.getTitle();
            this.content = board.getContent();
            this.thumbnail = board.getThumbnail();
            this.username = board.getUser().getUsername();
        }
    }
}
