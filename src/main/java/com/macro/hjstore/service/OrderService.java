package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.order.OrderRepository;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @MyLog
    public String 주문목록만들기(String userEmail, OrderDTO.BeforePay beforePay){

        Order orderPS = beforePay.toEntity(userEmail);
        String orderId = orderPS.getOrderCode();

        orderRepository.save(orderPS);
        return orderId;
    }

    @MyLog
    public OrderDTO.ResponseOrderSheet 주문목록가져오기(String orderCode){

        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));

        System.out.println("인코딩전");
        OrderDTO.ResponseOrderSheet responseOrderSheet = new OrderDTO.ResponseOrderSheet(orderPS);
        System.out.println("인코딩완료");
        return responseOrderSheet;
    }

    @MyLog
    @Transactional
    public Order 판매자페이지주문서가져오기(String orderCode){

        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));

        return orderPS;
    }


    @MyLog
    public void 주문목록삭제(String orderCode){
        System.out.println("주문서찾기직전!");
        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderRepository.delete(orderPS);
    }

    @MyLog
    public void 주문상태변경(String orderCode){

        System.out.println("주문서찾기직전!");
        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderPS.setState(false);
        orderRepository.save(orderPS);
    }

    @MyLog
    public List<OrderDTO.ResponseOrders> 주문서(String email){
        try {
            List<Order> orderList = orderRepository.findByUserEmail(email);
            List<OrderDTO.ResponseOrders>orders = orderList.stream().map(product -> new OrderDTO.ResponseOrders(product)).collect(Collectors.toList());
            System.out.println(orders.get(0).getOrderName());
            return orders;
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new Exception404("주문목록을 가져올 수 없습니다.");
        }
    }

}
