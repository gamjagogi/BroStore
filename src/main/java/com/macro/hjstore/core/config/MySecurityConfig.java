package com.macro.hjstore.core.config;

import com.macro.hjstore.core.auth.jwt.MyJwtAuthenticationFilter;
import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.core.exception.Exception403;
import com.macro.hjstore.core.util.MyFilterResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
public class MySecurityConfig {

    @Bean
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // JWT필터 등록이 필요함
    public class CustomSecurityFilterManager extends AbstractHttpConfigurer<CustomSecurityFilterManager, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder.addFilter(new MyJwtAuthenticationFilter(authenticationManager));

            super.configure(builder);
        }
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.csrf().disable();

        http.headers().frameOptions().disable();

        http.cors().configurationSource(corsConfigurationSource());

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.formLogin().disable();

        http.httpBasic().disable();

        http.apply(new CustomSecurityFilterManager());

        http.exceptionHandling().authenticationEntryPoint((request,response,authException) ->
        {
            log.warn("인증되지않은 사용자가 접근하려 합니다 : "+authException.getMessage());
            MyFilterResponseUtil.unAuthorized(response,new Exception401("인증되지 않았습니다."));
        });

        http.exceptionHandling().accessDeniedHandler((request, response, accessDeniedException) ->
        {
           log.warn("권한이 없는 사용자가 접근하려고 합니다 : "+accessDeniedException.getMessage());
           MyFilterResponseUtil.forbidden(response, new Exception403("권한이 없습니다."));
        });

        http.authorizeRequests(
                authorize -> authorize.antMatchers("/auth/**").authenticated()
                        .antMatchers("/manager/**")
                        .access("hasRole('AMDIN') or hasRole('MANAGER')")
                        .antMatchers("/admin/**").hasRole("ADMIN")
                        .anyRequest().permitAll()
        );
        return http.build();
    }

    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedOriginPattern("*");
        configuration.setAllowCredentials(true); //클라이언트에서 쿠키요청 허용
        configuration.addExposedHeader("Authentication");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
