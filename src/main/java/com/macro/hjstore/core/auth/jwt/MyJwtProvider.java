package com.macro.hjstore.core.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.macro.hjstore.core.exception.Exception401;
import com.macro.hjstore.model.token.RefreshTokenEntity;
import com.macro.hjstore.model.token.TokenStatus;
import com.macro.hjstore.model.user.User;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class MyJwtProvider {

    private static final String SUBJECT = "macroStore";
    private static final int EXP = 1000 * 60 * 60 * 24; //24시간
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String ACCESS_HEADER = "Authorization";
    private static final String ACCESS_SECRET = "gamja";

    protected static final int EXP_REFRESH = 1000 * 60 * 60* 24 * 7; // 7일
    public static final String REFRESH_HEADER = "RefreshToken";
    public static final String REFRESH_SECRET = "gamjagogi";

    public static String create(User user){
        String jwt = JWT.create()
                .withSubject(SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXP))
                .withClaim("id", user.getId())
                .withClaim("role", user.getRole().name()) // enum -> String
                .sign(Algorithm.HMAC512(ACCESS_SECRET));
        return TOKEN_PREFIX + jwt;
    }

    public static DecodedJWT verify(String jwt) throws SignatureVerificationException,TokenExpiredException {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(ACCESS_SECRET))
                .build().verify(jwt);
        return decodedJWT;
    }

    public static Pair<String, RefreshTokenEntity>createRefresh(User user) {
        // 1. uuid를 만든다.
        // 2. RefreshTokenEntity를 사용해서,( user, uuid, TokenStatus.VALID  )
        // 3. return Pair(jwt, refreshToken)
        String uuid = UUID.randomUUID().toString();

        RefreshTokenEntity refreshToken = new RefreshTokenEntity(user, uuid, TokenStatus.VALID);
        String jwt = JWT.create()
                .withSubject(SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXP_REFRESH))
                .withClaim("uuid", uuid)
                .sign(Algorithm.HMAC512(REFRESH_SECRET));
        return Pair.of(TOKEN_PREFIX + jwt, refreshToken); // new 안하고, Pair.of() 왜일까?
    }
}
