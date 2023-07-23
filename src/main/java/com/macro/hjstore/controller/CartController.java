package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.shop.CartResponseDTO;
import com.macro.hjstore.model.cart.Cart;
import com.macro.hjstore.model.cart.CartItem;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.user.User;
import com.macro.hjstore.service.CartService;
import com.macro.hjstore.service.DeliveryService;
import com.macro.hjstore.service.SoftwareService;
import com.macro.hjstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CartController {

    private final CartService cartService;

    private final UserService userService;

    private final DeliveryService deliveryService;

    // 장바구니에 물건 넣기
    // post요청받을시 body데이터에 있어야하는것: 상품 id, 상품 갯수
    @PostMapping("/auth/cart/save/{itemId}")
    public ResponseEntity<?> addCartItem(@PathVariable("itemId") Long itemId, @RequestBody Integer count, @AuthenticationPrincipal MyUserDetails userDetails) {

        User userPS = userDetails.getUser();
        Delivery deliveryPS = deliveryService.상품찾기(itemId);


        cartService.addCart(userPS, deliveryPS, count);

        ResponseDTO<?>responseDTO = new ResponseDTO<>();
        return ResponseEntity.ok().body(responseDTO);
    }

    // 장바구니 페이지 접속
    @GetMapping("/auth/cart/{id}")
    public ResponseEntity<?> userCartPage(@PathVariable("id") Long id,  @AuthenticationPrincipal MyUserDetails principalDetails) {

        // 로그인이 되어있는 유저의 id와 장바구니에 접속하는 id가 같아야 함
        if (principalDetails.getUser().getId() == id) {


                User userPS = userService.회원찾기(id);
                // 로그인 되어 있는 유저에 해당하는 장바구니 가져오기
                Cart userCart = userPS.getCart();

                System.out.println(userCart);


                // 장바구니에 들어있는 아이템 모두 가져오기
                List<CartItem> cartItemList = cartService.모든장바구니상품가져오기(userCart);


                System.out.println(cartItemList);

                // 장바구니에 들어있는 상품들의 총 가격
                Integer totalPrice = 0;
                for (CartItem cartitem : cartItemList) {
                    System.out.println(cartitem.getCount());
                    totalPrice += cartitem.getCount() * cartitem.getDelivery().getPrice();
                }


                CartResponseDTO cartResponseDTO = new CartResponseDTO(cartItemList, totalPrice, userCart.getCount(), userPS);


                ResponseDTO<?> responseDTO = new ResponseDTO<>(cartResponseDTO);

                return ResponseEntity.ok().body(responseDTO);

        }
        // 로그인 id와 장바구니 접속 id가 같지 않는 경우
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    // 장바구니에서 물건 삭제
// 삭제하고 남은 상품의 총 개수
    @GetMapping("/auth/cart/delete/{id}/{cartItemId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable("id") Long id, @PathVariable("cartItemId") Long cartItemId, @AuthenticationPrincipal MyUserDetails principalDetails) {
        // 로그인 유저 id와 장바구니 유저의 id가 같아야 함
        if (principalDetails.getUser().getId() == id) {
            // itemId로 장바구니 상품 찾기
            CartItem cartItemPS = cartService.카트상품찾기(cartItemId);
            cartService.카트상품삭제(cartItemId);

            User userPS = userService.회원찾기(id);

            Cart userCart = cartService.유저ID로카트찾기(id);
            // 장바구니에 들어있는 아이템 모두 가져오기
            List<CartItem> cartItemList = cartService.모든장바구니상품가져오기(userCart);

            // 갱신 된 장바구니에 들어있는 상품들의 총 가격
            Integer totalPrice = 0;
            Integer totalCount = 0;
            for (CartItem cartitem : cartItemList) {
                System.out.println(cartitem.getCount());
                totalPrice += cartitem.getCount() * cartitem.getDelivery().getPrice();
                totalCount += cartitem.getCount();
            }
            cartService.카트총수량수정(userCart,totalCount);

            System.out.println(userCart.getCount());

            CartResponseDTO cartResponseDTO = new CartResponseDTO(cartItemList, totalPrice, userCart.getCount(), userPS);

            ResponseDTO responseDTO = new ResponseDTO(cartResponseDTO);

            return ResponseEntity.ok().body(responseDTO);
        }
        // 로그인 id와 장바구니 삭제하려는 유저의 id가 같지 않는 경우
        else {
            ResponseDTO<?> responseDTO = new ResponseDTO<>(HttpStatus.NOT_FOUND,"로그인 유저정보가 세션 유저가 일치하지않습니다.",id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDTO);
        }
    }


    @PostMapping("/auth/cart/change/{id}/{cartItemId}")
    public ResponseEntity<?> changeCountCartItem(@PathVariable("id") Long id, @PathVariable("cartItemId") Long cartItemId
            ,@RequestBody Integer count ,@AuthenticationPrincipal MyUserDetails principalDetails) {
        // 로그인 유저 id와 장바구니 유저의 id가 같아야 함
        if (principalDetails.getUser().getId() == id) {
            // itemId로 장바구니 상품 찾기

            System.out.println(count);

            cartService.카트아이템수량수정(cartItemId,count);

            CartItem cartItemPS = cartService.카트상품찾기(cartItemId);
            User userPS = userService.회원찾기(id);


            Cart userCart = cartService.유저ID로카트찾기(id);
            // 장바구니에 들어있는 아이템 모두 가져오기
            List<CartItem> cartItemList = cartService.모든장바구니상품가져오기(userCart);

            // 갱신 된 장바구니에 들어있는 상품들의 총 가격
            Integer totalPrice = 0;
            Integer totalCount = 0;
            for (CartItem cartitem : cartItemList) {
                System.out.println(cartitem.getCount());
                totalPrice += cartitem.getCount() * cartitem.getDelivery().getPrice();
                totalCount += cartitem.getCount();
            }
            // 해당 카트 아이템과 카트 아이템 총 수량 수정


            cartService.카트총수량수정(userCart,totalCount);

            Cart userCartPS = cartService.유저ID로카트찾기(id);

            System.out.println("보내기 직전 총 갯수: "+ userCartPS.getCount());
            CartResponseDTO cartResponseDTO = new CartResponseDTO(cartItemList, totalPrice, userCartPS.getCount(), userPS);

            ResponseDTO responseDTO = new ResponseDTO(cartResponseDTO);

            return ResponseEntity.ok().body(responseDTO);
        }
        // 로그인 id와 장바구니 삭제하려는 유저의 id가 같지 않는 경우
        else {
            ResponseDTO<?> responseDTO = new ResponseDTO<>(HttpStatus.NOT_FOUND,"로그인 유저정보가 세션 유저가 일치하지않습니다.",id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDTO);
        }
    }

}
