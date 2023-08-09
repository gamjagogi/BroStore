package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.model.cart.Cart;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.order.OrderRepository;
import com.macro.hjstore.model.order.OrderStatus;
import com.macro.hjstore.model.seller.Seller;
import com.macro.hjstore.model.seller.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SellerService {

    private final SellerRepository sellerRepository;

    private final OrderRepository orderRepository;

    @MyLog
    @Transactional
    public void 모든주문내역에추가(Cart cart, Order order){
        List<Seller>orderList = cart.orderList(order);
        sellerRepository.saveAll(orderList);
    }

    @MyLog
    @Transactional
    public List<Seller> 판매자아이디로주문서찾기(Long id){

         List<Seller>sellerList = sellerRepository.findBySellerId(id);
         sellerList.stream().map(seller -> {
             Order orderPS = orderRepository.findByOrderId(seller.getOrderCode())
                     .orElseThrow(() -> new Exception404("주문ID로 주문서를 찾을 수 없습니다."));
             seller.setState(orderPS.isState());
             seller.setStatus(orderPS.getStatus());
             return seller;
         }).collect(Collectors.toList());
        return sellerList;
    }

    @MyLog
    public void 주문취소완료처리(String orderCode){

        System.out.println("주문서찾기직전!");
        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderPS.setStatus(OrderStatus.CANCELLATION_COMPLETED);
        orderRepository.save(orderPS);
    }

    @MyLog
    public void 주문배달완료처리(String orderCode){

        System.out.println("주문서찾기직전!");
        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderPS.setStatus(OrderStatus.DELIVERY_COMPLETED);
        orderRepository.save(orderPS);
    }
}
