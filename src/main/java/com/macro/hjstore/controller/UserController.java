package com.macro.hjstore.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.core.util.Fetch;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.user.KakaoToken;
import com.macro.hjstore.dto.user.OAuthProfile;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.dto.user.UserResponse;

import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import javax.servlet.http.HttpSession;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;
    private final HttpSession session;
    private String clientId = "c4ea7b717441096606e933d562d8f8a6";
    private String redirectUri = "http://localhost:3000/auth";
    private String authorizationCode;
    private String grantType = "authorization_code";


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserRequest.LoginInDTO loginInDTO, Errors errors) {

        Pair<String,String>tokenUS = userService.로그인(loginInDTO);
        //checkpoint : loginOutDTO를 다시 만들어라.
        UserResponse.LoginOutDTO loginOutDTO = userService.이메일로회원조회(loginInDTO.getEmail());

        System.out.println(tokenUS.getFirst());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "access-token, refresh-token"); // 추가
        headers.add("access-token", tokenUS.getFirst());
        headers.add("refresh-token", tokenUS.getSecond());

        String accessToken = headers.getFirst("access-token");
        System.out.println("Access Token: " + accessToken);

        ResponseDTO<?> responseDTO = new ResponseDTO<>(loginOutDTO);

        return ResponseEntity.ok()
                .headers(headers)
                .body(responseDTO);
    }

    @PostMapping("/login/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody @Valid UserRequest.LoginKakao loginKakao,Errors errors) throws JsonProcessingException {

        if(loginKakao==null || loginKakao.getCode().isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        System.out.println("카카오로그인 진입!");
        String code = loginKakao.getCode();
        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", grantType);
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);
        authorizationCode = code;

        System.out.println("인가코드로 가져오기!!");
        ResponseEntity<String> codeEntity = Fetch.kakao("https://kauth.kakao.com/oauth/token"
                , HttpMethod.POST, body);

        // 3. access token으로 카카오의 홍길동 resource 접근 가능해짐 -> access token을 파싱하고
        ObjectMapper om = new ObjectMapper();
        om.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        KakaoToken kakaoToken = om.readValue(codeEntity.getBody(), KakaoToken.class);

        // 4. access token으로 email 정보 받기 (ssar@gmail.com)
        ResponseEntity<String> tokenEntity = Fetch.kakao("https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoToken.getAccessToken());
        OAuthProfile oAuthProfile = om.readValue(tokenEntity.getBody(), OAuthProfile.class);

        String email = oAuthProfile.getKakaoAccount().getEmail();
        // 5. 해당 provider_id 값으로 회원가입되어 있는 user의 username 정보가 있는지 DB 조회 (X)
        User userPS = userService.카카오이메일찾기(email);

        // 6. 있으면 그 user 정보로 session 만들어주고, (자동로그인) (X)
        if(userPS != null){
            System.out.println("디버그 : 회원정보가 있어서 로그인을 바로 진행합니다");
            Pair<String,String>tokenUS = userService.카카오인증후토큰만들기(userPS);
            //checkpoint : loginOutDTO를 다시 만들어라.
            UserResponse.LoginOutDTO loginOutDTO = userService.이메일로회원조회(userPS.getEmail());

            System.out.println("카카오 액세스토큰"+tokenUS.getFirst());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Expose-Headers", "access-token, refresh-token"); // 추가
            headers.add("access-token", tokenUS.getFirst());
            headers.add("refresh-token", tokenUS.getSecond());
            headers.add("kakao-access-token",kakaoToken.getAccessToken());
            headers.add("kakao-refresh-token",kakaoToken.getRefreshToken());

            String accessToken = headers.getFirst("access-token");
            System.out.println("Access Token: " + accessToken);

            ResponseDTO<?> responseDTO = new ResponseDTO<>(loginOutDTO);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(responseDTO);
        }

        // 7. 없으면 강제 회원가입 시키고, 그 정보로 session 만들어주고, (자동로그인)
        if(userPS == null){
            System.out.println("디버그 : 회원정보가 없어서 회원가입 후 로그인을 바로 진행합니다");
            Pair<String,String>tokenUS = userService.카카오인증가입후토큰만들기(email);

            UserResponse.LoginOutDTO loginOutDTO = userService.이메일로회원조회(email);

            System.out.println("카카오 액세스토큰"+tokenUS.getFirst());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Expose-Headers", "access-token, refresh-token"); // 추가
            headers.add("access-token", tokenUS.getFirst());
            headers.add("refresh-token", tokenUS.getSecond());
            headers.add("kakao-access-token",kakaoToken.getAccessToken());
            headers.add("kakao-refresh-token",kakaoToken.getRefreshToken());

            String accessToken = headers.getFirst("access-token");
            System.out.println("Access Token: " + accessToken);

            ResponseDTO<?> responseDTO = new ResponseDTO<>(loginOutDTO);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(responseDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/join")
    @Transactional
    public ResponseEntity<?> join(@RequestBody @Valid UserRequest.JoinInDTO joinInDTO, Errors errors){
        userService.회원가입(joinInDTO);
        return ResponseEntity.ok().build();
    }

}
