package com.macro.hjstore.core.dummy;

import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


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
}
