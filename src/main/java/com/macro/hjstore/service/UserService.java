package com.macro.hjstore.service;


import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.auth.jwt.MyJwtProvider;
import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.model.token.RefreshTokenEntity;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final S3Service s3Service;



    @MyLog
    public Pair<String, String> 로그인(UserRequest.LoginInDTO loginInDTO) {
        try {
            // DB에서 사용자 정보 조회
            User user = userService.이메일로유저찾기(loginInDTO.getEmail());

            // 비밀번호 확인
            if (!passwordEncoder.matches(loginInDTO.getPassword(), user.getPassword())) {
                throw new Exception401("비밀번호가 일치하지 않습니다");
            }
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
            throw new Exception401("인증되지 않았습니다");
        }
    }


    @MyLog
    public User 이메일로유저찾기(UserRequest.){

    }
}
