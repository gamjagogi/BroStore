package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.order.OrderRepository;
import com.macro.hjstore.model.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @MyLog
    public void 주문목록만들기(String userEmail, OrderDTO.BeforePay beforePay){

        Order orderPS = beforePay.toEntity(userEmail);

        orderRepository.save(orderPS);
    }

    @MyLog
    public OrderDTO.ResponseOrderSheet 주문목록가져오기(String userEmail){

        Order orderPS = orderRepository.findByUserEmail(userEmail)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));

        System.out.println("인코딩전");
        OrderDTO.ResponseOrderSheet responseOrderSheet = new OrderDTO.ResponseOrderSheet(orderPS);
        System.out.println("인코딩완료");
        return responseOrderSheet;
    }
}
