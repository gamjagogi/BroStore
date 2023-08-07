package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.pay.OrderDTO;
import com.macro.hjstore.model.order.Order;
import com.macro.hjstore.model.order.OrderRepository;
import com.macro.hjstore.model.order.OrderStatus;
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

        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderRepository.delete(orderPS);
    }

    @MyLog
    public void 주문상태변경(String orderCode,Integer code) throws Exception{
        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        if(code==10){
            orderPS.setStatus(OrderStatus.WAITE_PAYMENT);
            orderRepository.save(orderPS);
        }else if(code==11){
            orderPS.setStatus(OrderStatus.SHIPPING_IN_PROGRESS);
            orderRepository.save(orderPS);
        }else if(code==100){
            orderPS.setStatus(OrderStatus.DELIVERY_COMPLETED);
            orderRepository.save(orderPS);
        }else if(code==101){
            orderPS.setStatus(OrderStatus.CANCELLATION_PROCESSING);
            orderRepository.save(orderPS);
        }else if(code==111){
            orderPS.setStatus(OrderStatus.CANCELLATION_COMPLETED);
            orderRepository.save(orderPS);
        }
    }

    @MyLog
    public void 주문취소(String orderCode){

        Order orderPS = orderRepository.findByOrderId(orderCode)
                .orElseThrow(()-> new Exception404("해당 주문목록을 찾을 수 없습니다."));
        orderPS.setState(false);
        orderPS.setStatus(OrderStatus.CANCELLATION_PROCESSING);
        orderRepository.save(orderPS);
    }

    @MyLog
    public List<OrderDTO.ResponseOrders> 주문서(String email){
        try {
            List<Order> orderList = orderRepository.findByUserEmail(email);
            List<OrderDTO.ResponseOrders>orders = orderList.stream().map(order -> new OrderDTO.ResponseOrders(order)).collect(Collectors.toList());
            System.out.println(orders.get(0).getOrderName());
            System.out.println("주문상태 테스트: "+orders.get(0).getStatus());
            return orders;
        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new Exception404("주문목록을 가져올 수 없습니다.");
        }
    }

}
