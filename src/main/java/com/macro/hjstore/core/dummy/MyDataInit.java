package com.macro.hjstore.core.dummy;

import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.model.board.BoardRepository;
import com.macro.hjstore.model.softwareProduct.SoftwareRepository;
import com.macro.hjstore.model.token.TokenRepository;
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
    public CommandLineRunner init(UserRepository userRepository, BoardRepository boardRepository, TokenRepository tokenRepository, SoftwareRepository softwareRepository){
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
            boardRepository.save(newBoard("rog ally","rog ally nice",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("steam deck","komodo",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("tigally","tmon rog ally bad",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("gogo","tmon rog ",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("papap","tmon ",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("hahah","tmon asus",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("huhu","rog ally bad",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("gamja","asus rog ally bad",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("kakak","kakao",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));
            boardRepository.save(newBoard("russian","chocolette",userRepository.findByEmail("gamja@gmail.com").orElseThrow( () -> new Exception404("작성자가 없습니다."))));

            softwareRepository.save(newSoftware("/software/1","title","https://image-gamja.s3.ap-northeast-2.amazonaws.com/20190622_213755.jpg","content"));
            softwareRepository.save(newSoftware("/software/2","title2","https://image-gamja.s3.ap-northeast-2.amazonaws.com/20190622_213755.jpg","content2"));
            softwareRepository.save(newSoftware("/software/3","title3","https://image-gamja.s3.ap-northeast-2.amazonaws.com/20190622_213755.jpg","content3"));

        };
    }
}
