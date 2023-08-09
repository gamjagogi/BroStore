package com.macro.hjstore.model.comment;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.question.Question;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "question_comment_tb")
@Entity
public class QuestionComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private Long userId;

    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdatedAt(){
        this.updatedAt = LocalDateTime.now();
    }

    @Builder
    public QuestionComment(Long id, String username,Long userId ,String content, Question question, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.username = username;
        this.userId = userId;
        this.content = content;
        this.question = question;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
