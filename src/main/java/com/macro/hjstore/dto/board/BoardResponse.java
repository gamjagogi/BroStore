package com.macro.hjstore.dto.board;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.comment.Comment;
import com.macro.hjstore.model.question.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

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

        private Long userId;

        private List<BoardResponse.Comments>comments;

        public DetailDTO(String title, String content, String thumbnail, String username,Long userId,List<BoardResponse.Comments>comments) {
            this.title = title;
            this.content = content;
            this.thumbnail = thumbnail;
            this.username = username;
            this.userId = userId;
            this.comments = comments;
        }

    }

    @Getter
    public static class Comments{

        private Long commentId;

        private String username;

        private Long userId;

        private String content;

        private String createdAt;

        public Comments(Comment comment){
            this.commentId = comment.getId();
            this.username = comment.getUsername();
            this.content = comment.getContent();
            this.createdAt = comment.getCreatedAt().toString();
            this.userId = comment.getUserId();
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
