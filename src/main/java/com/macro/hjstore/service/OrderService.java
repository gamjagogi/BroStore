package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
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
    public void addOrderSheet(User user, OrderDTO.BeforePay beforePay){

        Order orderPS = beforePay.toEntity(user);

        orderRepository.save(orderPS);
    }


}
