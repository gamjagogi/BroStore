package com.macro.hjstore.service;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.dummy.MyDataInit;
import com.macro.hjstore.core.dummy.MyDummyEntity;
import com.macro.hjstore.dto.user.UserRequest;
import com.macro.hjstore.model.token.TokenRepository;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import com.macro.hjstore.model.user.UserRole;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.ArgumentMatchers.any;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
@Transactional
public class UserServiceTest extends MyDummyEntity{


    @InjectMocks
    private MyDataInit myDataInit;

    // 진짜 userService 객체를 만들고 Mock로 Load된 모든 객체를 userService에 주입
    @InjectMocks
    private UserService userService;


    // 진짜 객체를 만들어서 Mockito 환경에 Load
    @InjectMocks
    private UserRepository userRepository;

    // 가짜 객체를 만들어서 Mockito 환경에 Load
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenRepository tokenRepository;

    // 진짜 객체를 만들어서 Mockito 환경에 Load
    @Spy
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    @Test
    public void hello_test() {
        String pw = "1234";
        String enc = bCryptPasswordEncoder.encode(pw);
        System.out.println(enc);
    }

    @Test
    public void 로그인_test() throws Exception {
        // given
        UserRequest.LoginInDTO loginInDTO = new UserRequest.LoginInDTO();
        loginInDTO.setEmail("cos@nate.com");
        loginInDTO.setPassword("1234");

        // stub

        User cos = newUser("cos@nate.com", "박코스", UserRole.ROLE_USER , "950402");
        MyUserDetails myUserDetails = new MyUserDetails(cos);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                myUserDetails, myUserDetails.getPassword(), myUserDetails.getAuthorities()
        );
        Mockito.when(authenticationManager.authenticate(any())).thenReturn(authentication);

        // when
        Pair<String, String> tokenInfo = userService.로그인(loginInDTO);
        System.out.println("디버그 : "+tokenInfo.getFirst());
        System.out.println("디버그 : "+tokenInfo.getSecond());

        // then
        Assertions.assertThat(tokenInfo.getFirst().startsWith("Bearer ")).isTrue();
        Assertions.assertThat(tokenInfo.getSecond().startsWith("Bearer ")).isTrue();
    }

}
