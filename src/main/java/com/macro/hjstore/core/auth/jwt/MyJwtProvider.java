package com.macro.hjstore.core.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.macro.hjstore.model.token.RefreshTokenEntity;
import com.macro.hjstore.model.user.User;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MyJwtProvider {

    private static final String SUBJECT = "macroStore";
    private static final int EXP = 1000 * 60 * 60 * 24; //24시간
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER = "Authorization";
    private static final String SECRET = "gamja";

    public static String create(User user){
        String jwt = JWT.create()
                .withSubject(SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXP))
                .withClaim("id", user.getId())
                .withClaim("role", user.getRole().name()) // enum -> String
                .sign(Algorithm.HMAC512(SECRET));
        return TOKEN_PREFIX + jwt;
    }

    public static DecodedJWT verify(String jwt) throws SignatureVerificationException,TokenExpiredException {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(SECRET))
                .build().verify(jwt);
        return decodedJWT;
    }

    public static Pair<String, RefreshTokenEntity>createRefresh(User user){

    }
}
