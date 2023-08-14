package com.macro.hjstore.service;


import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.auth.jwt.MyJwtProvider;
import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.auth.session.MyUserDetailsService;
import com.macro.hjstore.core.exception.Exception400;
import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.user.KakaoToken;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.dto.user.UserResponse;
import com.macro.hjstore.model.token.RefreshTokenEntity;
import com.macro.hjstore.model.token.TokenRepository;
import com.macro.hjstore.model.token.TokenStatus;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import com.macro.hjstore.model.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

// DB에서 사용자 정보 조회

// 비밀번호 확인

// 아이디, 비밀번호 확인이되면, UsernamePasswordToken객체를 사용해서, Authentication에 유저정보를 등록한다.\

//로그인 성공하면 액세스 토큰, 리프레시 토큰 발급. 리프레시 토큰의 uuid은 DB에 저장


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;


    @MyLog
    public Pair<String, String> 로그인(UserRequest.LoginInDTO loginInDTO) {
        try {
            System.out.println(loginInDTO.getEmail() + " " + loginInDTO.getPassword());

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                    = new UsernamePasswordAuthenticationToken(loginInDTO.getEmail(), loginInDTO.getPassword());


            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();


            String accessjwt = MyJwtProvider.create(myUserDetails.getUser());
            Pair<String, RefreshTokenEntity> rtInfo = MyJwtProvider.createRefresh(myUserDetails.getUser());

            //로그인 성공하면 액세스 토큰, 리프레시 토큰 발급. 리프레시 토큰의 uuid은 DB에 저장
            tokenRepository.save(rtInfo.getSecond());

            return Pair.of(accessjwt, rtInfo.getFirst());
        } catch (Exception e) {
            throw new Exception401("인증되지 않았습니다.");
        }
    }


    @MyLog
    public Pair<String, String> 카카오인증후토큰만들기(User user) {
        try {

            // 이부분 수정해야댐!!!!!!! 7/28 해야될것!!!
            System.out.println("카카오인증후토큰만들기 진입");
            System.out.println(user.getEmail() + " " + user.getCustomerKey());


            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                    = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getCustomerKey());

            System.out.println("시큐리티 인증토큰 등록!");
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            System.out.println("유저디테일객체 만들기!");
            MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();


            System.out.println("액세스 토큰 등록!!");

            String accessjwt = MyJwtProvider.create(myUserDetails.getUser());
            Pair<String, RefreshTokenEntity> rtInfo = MyJwtProvider.createRefresh(myUserDetails.getUser());

            //로그인 성공하면 액세스 토큰, 리프레시 토큰 발급. 리프레시 토큰의 uuid은 DB에 저장
            tokenRepository.save(rtInfo.getSecond());

            return Pair.of(accessjwt, rtInfo.getFirst());
        } catch (Exception e) {
            throw new Exception401("인증되지 않았습니다.");
        }
    }

    @MyLog
    public Pair<String, String> 카카오인증가입후토큰만들기(String email) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String customerKey = "ID_" + UUID.randomUUID().toString();
            String userEmail = email;
            System.out.println("카카오인증가입 진입, 이메일:" + userEmail);
            User userPS = User.builder()
                    .email(userEmail)
                    .password(encoder.encode(customerKey))
                    .username("need update")
                    .role(UserRole.ROLE_USER)
                    .customerKey(customerKey)
                    .birth("kakao_user: need updating.")
                    .provider("kakao")
                    .status(true)
                    .build();
            userRepository.save(userPS);
            System.out.println("카카오회원가입완료!");

            User user = userRepository.findByKakaoEmail(email);
            System.out.println(user.getEmail());

            System.out.println(user.getEmail() + " " + customerKey);


            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                    = new UsernamePasswordAuthenticationToken(user.getEmail(), customerKey);

            System.out.println("시큐리티 인증토큰 등록!");
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            System.out.println("유저디테일객체 만들기!");
            MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();

            System.out.println("액세스 토큰 등록!!");

            String accessjwt = MyJwtProvider.create(myUserDetails.getUser());
            Pair<String, RefreshTokenEntity> rtInfo = MyJwtProvider.createRefresh(myUserDetails.getUser());

            //로그인 성공하면 액세스 토큰, 리프레시 토큰 발급. 리프레시 토큰의 uuid은 DB에 저장
            tokenRepository.save(rtInfo.getSecond());

            return Pair.of(accessjwt, rtInfo.getFirst());
        } catch (Exception e) {
            throw new Exception401("인증되지 않았습니다.");
        }
    }

    @MyLog
    public UserResponse.LoginOutDTO 이메일로회원조회(String email) {
        User userPS = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception400(email, "해당 유저를 찾을 수 없습니다."));

        System.out.println(userPS.getRole().toString());
        UserResponse.LoginOutDTO loginOutDTO = new UserResponse.LoginOutDTO(userPS.getUsername(), userPS.getId(), userPS.getRole().toString());
        return loginOutDTO;
    }
    @MyLog
    public User 이메일로회원찾기(String email) {
        User userPS = userRepository.findByKakaoEmail(email);
        return userPS;
    }


    @MyLog
    public User 카카오이메일찾기(String email) {
        User userPS = userRepository.findByKakaoEmail(email);
        return userPS;
    }

    @MyLog
    public void 회원가입(UserRequest.JoinInDTO joinInDTO) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String customerKey = "ID_" + UUID.randomUUID().toString();
        User userPS = User.builder()
                .email(joinInDTO.getEmail())
                .password(encoder.encode(joinInDTO.getPassword()))
                .username(joinInDTO.getUsername())
                .birth(joinInDTO.getBirth())
                .role(UserRole.ROLE_USER)
                .customerKey(customerKey)
                .status(true)
                .build();
        userRepository.save(userPS);
    }

    @MyLog
    public User 회원찾기(Long id) {
        User userPS = userRepository.findById(id)
                .orElseThrow(() -> new Exception404("회원을 찾을 수 없습니다"));
        return userPS;
    }

    @MyLog
    @Transactional
    public void 회원업데이트(User user){
        userRepository.save(user);
    }

}
