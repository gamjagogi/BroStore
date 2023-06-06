package com.macro.hjstore.core.dummy;

import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import com.macro.hjstore.model.user.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class MyDataInit extends MyDummyEntity{
    @Bean
    public CommandLineRunner init(UserRepository userRepository){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return args -> {
            userRepository.save(User.builder()
                    .email("gamja@gmail.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(UserRole.ROLE_ADMIN)
                    .username("김만수르")
                    .birth("950406")
                    .status(true)
                    .build());
            userRepository.save(User.builder()
                    .email("pizza@gmail.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(UserRole.ROLE_ADMIN)
                    .username("김피자")
                    .birth("950206")
                    .status(true)
                    .build());
            userRepository.save(User.builder()
                    .email("goguma@gmail.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(UserRole.ROLE_ADMIN)
                    .username("김고구마")
                    .birth("950506")
                    .status(true)
                    .build());
        };
    }
}
