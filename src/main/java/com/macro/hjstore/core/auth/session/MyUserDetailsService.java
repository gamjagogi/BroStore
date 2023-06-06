package com.macro.hjstore.core.auth.session;

import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// 여기에서 db에 접근해서, 유저 패스워드 검사도 가능하지만, 여기서는 email만 확인하는 로직은 혹시모르니 만들어둔다.

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // username이 아니라, user email을 찾는 로직이다.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("디테일객체 도착! 이메일 찾기 직전!");
        System.out.println(email);

        User userPS = userRepository.findByEmail(email).orElseThrow(
                () -> new InternalAuthenticationServiceException("인증 실패")); // 나중에 테스트할 때 설명해드림.

        System.out.println(userPS);
        return new MyUserDetails(userPS);
    }
}
