package com.macro.hjstore.core.dummy;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


public class MyDummyEntity{
    public User newUser(String email, String username, UserRole userRole, String birth){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User userPS = User.builder()
                .email(email)
                .password(encoder.encode("1234"))
                .username(username)
                .role(userRole)
                .birth(birth)
                .status(true)
                .build();
        return userPS;
    }

    public Board newBoard(String title,String content,User user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Board boardPS = Board.builder()
                .title(title)
                .content(content)
                .thumbnail("/upload/link.png")
                .user(user)
                .build();
        return boardPS;
    }
}
