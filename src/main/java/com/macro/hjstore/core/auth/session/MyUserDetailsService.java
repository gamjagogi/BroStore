package com.macro.hjstore.core.auth.session;

import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// 여기에서 db에 접근해서, 유저 패스워드 검사도 가능하지만, 여기서는 email만 확인하는 로직은 혹시모르니 만들어둔다.

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // username이 아니라, user email을 찾는 로직이다.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userPS = userRepository.findByEmail(email).orElseThrow(
                () -> new InternalAuthenticationServiceException("인증 실패 "+ email));
        return new MyUserDetails(userPS);

    }
}
