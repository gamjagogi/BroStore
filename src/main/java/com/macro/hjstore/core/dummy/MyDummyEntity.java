package com.macro.hjstore.core.dummy;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


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
        Board boardPS = Board.builder()
                .title(title)
                .content(content)
                .thumbnail("src/main/resources/static/upload/link.jpg")
                .user(user)
                .build();
        return boardPS;
    }

    public Software newSoftware(String name,String thumbnail,String description){
        Software softwarePS = Software.builder()
                .name(name)
                .thumbnail(thumbnail)
                .price(1800)
                .originPrice(2000)
                .discountPrice(1800)
                .discountPercentage(10)
                .isNew(true)
                .isHot(true)
                .star(5)
                .isFreeShipping(true)
                .highlights("haha")
                .description(description)
                .build();
        return softwarePS;
    }
}
