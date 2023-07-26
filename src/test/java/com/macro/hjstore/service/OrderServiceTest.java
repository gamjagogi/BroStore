package com.macro.hjstore.service;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.core.dummy.MyDataInit;
import com.macro.hjstore.core.dummy.MyDummyEntity;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.order.Order;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;


@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
@Transactional
public class OrderServiceTest extends MyDummyEntity {

    // 진짜 userService 객체를 만들고 Mock로 Load된 모든 객체를 userService에 주입
    @InjectMocks
    private OrderService orderService;

    // 가짜 객체를 만들어서 Mockito 환경에 Load
    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenRepository tokenRepository;

    // 진짜 객체를 만들어서 Mockito 환경에 Load
    @Spy
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Test
    public void 주문목록만들기_test() throws Exception{
        // given
        String orderId = UUID.randomUUID().toString(); //uuid 테스트

        // stub
        User cos = newUser("cos@nate.com", "박코스", UserRole.ROLE_USER , "950402");


        // when
        Order orderPS = newOrder(orderId,cos);
        String orderIdPS = orderPS.getOrderId();

        // then
        Assertions.assertThat(orderIdPS).isInstanceOf(String.class);

    }

}
