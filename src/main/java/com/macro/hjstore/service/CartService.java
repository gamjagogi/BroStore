package com.macro.hjstore.service;


import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.model.cart.Cart;
import com.macro.hjstore.model.cart.CartItem;
import com.macro.hjstore.model.cart.CartItemRepository;
import com.macro.hjstore.model.cart.CartRepository;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.deliveryProduct.DeliveryRepository;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.softwareProduct.SoftwareRepository;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CartService {

    private final CartRepository cartRepository;

    private final DeliveryRepository deliveryRepository;

    private final CartItemRepository cartItemRepository;

    // 장바구니 담기
    @Transactional
    public void addCart(User user, Delivery delivery, Integer count) {

        // 유저 id로 해당 유저의 장바구니 찾기
        Cart cart = cartRepository.findByUserId(user.getId()).orElse(null);
        // 장바구니가 존재하지 않는다면
        if (cart == null) {
            cart = Cart.createCart(user);
            cartRepository.save(cart);
        }

        Delivery deliveryPS = deliveryRepository.findById(delivery.getId())
                .orElseThrow(() -> new Exception404("상품을 찾을 수 없습니다."));

        System.out.println("상품 찾기 성공");


        CartItem cartItem = cartItemRepository.findByCartIdAndItemId(cart.getId(), deliveryPS.getId())
                .orElse(null);

        // 상품이 장바구니에 존재하지 않는다면 카트상품 생성 후 추가
        if (cartItem == null) {
            cartItem = CartItem.createCartItem(cart, deliveryPS, count);
            cartItemRepository.save(cartItem);
        }
        // 상품이 장바구니에 이미 존재한다면 수량만 증가
        else {
            CartItem update = cartItem;
            update.setCart(cartItem.getCart());
            update.setDelivery(cartItem.getDelivery());
            update.addCount(count);
            update.setCount(update.getCount());
            cartItemRepository.save(update);
        }
        System.out.println(cart.getCount()+" "+ count);
        System.out.println(cart.getCount() instanceof Integer);

        // 카트 상품 총 개수 증가
        cart.setCount(cart.getCount() + count);

    }

    @MyLog
    public List<CartItem> 모든장바구니상품가져오기(Cart cart) {
        List<CartItem>cartItemList = cartItemRepository.findByCartId(cart.getId());
        return cartItemList;
    }

    @MyLog
    public CartItem 카트상품찾기(Long cartItemId){
        CartItem cartItemPS = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new Exception404("장바구니 상품을 찾을 수 없습니다."));
        return cartItemPS;
    }

    @MyLog
    public void 카트상품삭제(Long cartItemId){
        cartItemRepository.deleteById(cartItemId);
    }

    @MyLog
    public Cart 유저ID로카트찾기(Long userId){
        Cart cartPS = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new Exception404("해당 유저의 장바구니를 찾을 수 없습니다."));
        return cartPS;
    }

    @MyLog
    public void 카트아이템수량수정(Long cartItemId, Integer count){
        CartItem cartItemPS = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new Exception404("장바구니 상품을 찾을 수 없습니다."));
        System.out.println("변경전 : "+cartItemPS.getCount());
        cartItemPS.setCount(count);
        System.out.println("변경후 : "+cartItemPS.getCount());
        cartItemRepository.save(cartItemPS);
    }

    @MyLog
    public void 카트총수량수정(Cart userCart,Integer totalCount){
        userCart.setCount(totalCount);
        cartRepository.save(userCart);
    }

    @MyLog
    public void 카트삭제(Cart cart){
        System.out.println("카트삭제직전!!");
        cartRepository.delete(cart);
    }
}
