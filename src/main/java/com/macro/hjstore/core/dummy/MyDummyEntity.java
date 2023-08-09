package com.macro.hjstore.core.dummy;

import com.macro.hjstore.model.board.Board;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.model.user.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class MyDummyEntity{
    public User newUser(String email, String username, UserRole userRole, String birth,String customerKey){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User userPS = User.builder()
                .email(email)
                .password(encoder.encode("1234"))
                .username(username)
                .role(userRole)
                .birth(birth)
                .provider("kakao")
                .status(true)
                .build();
        return userPS;
    }

    public Board newBoard(String title,String content,User user){
        Board boardPS = Board.builder()
                .title(title)
                .content(content)
                .thumbnail("src/main/resources/static/upload/link.jpg")
                .user(user)
                .build();
        return boardPS;
    }

    public Software newSoftware(String name,String thumbnail,String description){
        Software softwarePS = Software.builder()
                .name(name)
                .thumbnail(thumbnail)
                .price(1800)
                .originPrice(2000)
                .discountPrice(1800)
                .discountPercent(10)
                .isNew(true)
                .isHot(true)
                .star(5)
                .isFreeShipping(true)
                .highlights("haha")
                .description(description)
                .build();
        return softwarePS;
    }

    public Order newOrder(String orderId,String userEmail){
        Order orderPS = Order.builder()
                .orderCode(orderId)
                .orderName("라면 외 3개")
                .userName("김만수르")
                .userEmail(userEmail)
                .tel("0103231234")
                .receiveAddress("서울 서초구 가로 감자빌딩")
                .orderPrice(1000)
                .state(true)
                .build();
        return orderPS;
    }

    public Delivery newDelivery(){
        Delivery deliveryPS = Delivery.builder()
                .sku("FAS-01")
                .name("제목")
                .price(1)
                .description("내용")
                .build();
        return deliveryPS;
    }
}
