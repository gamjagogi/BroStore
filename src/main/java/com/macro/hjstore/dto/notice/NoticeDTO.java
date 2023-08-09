package com.macro.hjstore.dto.notice;

import com.macro.hjstore.dto.board.BoardResponse;
import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.notice.Notice;
import com.macro.hjstore.model.question.Question;
import com.macro.hjstore.model.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

public class NoticeDTO {

    @Getter
    public static class NoticeElement {

        @NotEmpty
        private Long id;

        private Long userId;

        @NotEmpty
        @Size(max = 60)
        private String title;

        @NotEmpty
        private String content;


        private String username;


        private String createdAt;



        public NoticeElement(Notice notice) {
            this.id = notice.getId();
            this.userId = notice.getUser().getId();
            this.title = notice.getTitle();
            this.content = notice.getContent();
            this.username = notice.getUser().getUsername();
            this.createdAt = notice.getCreatedAt().toString();
        }
    }

    @Getter
    @Setter
    public static class Detail {

        private Long boardId;

        @NotEmpty
        @Size(max = 60)
        private String title;

        @NotEmpty
        private String content;

        private String username;

        private Long userId;

        private String createdAt;


        public Detail(Notice notice) {
            this.boardId = notice.getId();
            this.userId = notice.getUser().getId();
            this.title = notice.getTitle();
            this.content = notice.getContent();
            this.username = notice.getUser().getUsername();
            this.createdAt = notice.getCreatedAt().toString();
        }
    }


    @Setter
    @Getter
    public static class SaveInDTO {
        @NotEmpty
        private String title;
        @NotEmpty
        private String content;


        public Notice toEntity(User user) {
            return Notice.builder()
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

        public Notice toUpdateEntity(Notice notice, User user){
            return Notice.builder()
                    .user(user)
                    .title(title)
                    .content(content)
                    .id(boardId)
                    .createdAt(notice.getCreatedAt())
                    .build();
        }
    }
}