package com.macro.hjstore.dto.board;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.user.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotEmpty;

public class BoardRequest {
    @Setter
    @Getter
    public static class SaveInDTO {
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        private String thumbnail;

        public Board toEntity(User user) {
            return Board.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .build();
        }

        public Board toEntityAddThumbail(User user) {
            return Board.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .thumbnail(thumbnail)
                    .build();
        }

        public Question toQuestionEntity(User user) {
            return Question.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .build();
        }
    }

    @Setter
    @Getter
    public static class UpdateInDTO {
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        private Long boardId;

        public Board toUpdateEntity(User user){
            return Board.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .id(boardId)
                    .build();
        }
    }

    @Getter
    public static class QuestionSaveIn{
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        private String thumbnail;

        private String category;


        public Question toQuestionEntity(User user) {
            return Question.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .category(category)
                    .thumbnail(thumbnail)
                    .build();
        }
    }

    @Getter
    public static class QuestionUpdateIn{
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;

        private String category;

        private Long boardId;


        public Question toQuestionUpdateEntity(User user) {
            return Question.builder()
                    .id(boardId)
                    .user(user)
                    .title(title)
                    .content(content)
                    .category(category)
                    .build();
        }
    }
}