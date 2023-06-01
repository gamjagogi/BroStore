package com.macro.hjstore.core.auth.jwt;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MyJwtAuthenticationFilter extends BasicAuthenticationFilter {

    public MyJwtAuthenticationFilter(AuthenticationManager authenticationManager){
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws IOException, ServletException {
        String prefixJwt = request.getHeader(MyJwtProvider.HEADER);

        if(prefixJwt == null){
            chain.doFilter(request,response);
            return;
        }

        String jwt = prefixJwt.replace(MyJwtProvider.HEADER,"");
        try {
            System.out.println("디버그 : 토큰 있음");
            DecodedJWT decodedJWT = MyJwtProvider.verify(jwt);
            Long id = decodedJWT.getClaim("id").asLong();
            String role = decodedJWT.getClaim("role").asString();
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            // 시큐리티에서 UserService사용해서 패스워드 아이디 체크 안하고, 전부 컨트롤러에서 체크할거다.

            User user = User.builder().id(id).role(userRole).build(); // db에서 실제 아이디를 찾기않고 강제로 Authentication객체만들어서 토큰만 검증
            MyUserDetails userDetails = new MyUserDetails(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, userDetails.getPassword(),userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }catch (SignatureVerificationException sve) {
            log.error("토큰 검증 실패");
        }catch(TokenExpiredException tee){
            log.error("토큰 만료");
        }finally {
            chain.doFilter(request, response);
        }
    }
}
