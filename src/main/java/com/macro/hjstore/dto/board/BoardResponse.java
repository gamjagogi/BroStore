package com.macro.hjstore.dto.board;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.question.Question;
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

        public UserBoard(Question question) {
            this.id = question.getId();
            this.title = question.getTitle();
            this.content = question.getContent();
            this.thumbnail = question.getThumbnail();
            this.username = question.getUser().getUsername();
        }
    }

    @Getter
    public static class QuestionBoard {

        @NotEmpty
        private Long id;
        @NotEmpty
        @Size( max = 60)
        private String title;

        @NotEmpty
        private String content;

        private String thumbnail;

        private String username;

        private String category;

        public QuestionBoard(Question question) {
            this.id = question.getId();
            this.title = question.getTitle();
            this.content = question.getContent();
            this.thumbnail = question.getThumbnail();
            this.username = question.getUser().getUsername();
            this.category = question.getCategory();
        }
    }
    @Getter
    @Setter
    public static class QuestionDetail{

        @NotEmpty
        private Long id;

        @NotEmpty
        @Size( max = 60)
        private String title;

        @NotEmpty
        private String content;

        private String thumbnail;

        private String username;

        private String category;

        private Long userId;

        public QuestionDetail(Long id,String title, String content, String thumbnail, String username,String category,Long userId) {
            this.id = id;
            this.title = title;
            this.content = content;
            this.thumbnail = thumbnail;
            this.username = username;
            this.category = category;
            this.userId = userId;
        }
    }
}
