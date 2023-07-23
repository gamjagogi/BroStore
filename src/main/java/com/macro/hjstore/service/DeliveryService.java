package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareResponseDTO;
import com.macro.hjstore.model.deliveryProduct.Delivery;
import com.macro.hjstore.model.deliveryProduct.DeliveryRepository;
import com.macro.hjstore.model.softwareProduct.Software;
import com.macro.hjstore.model.softwareProduct.SoftwareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @MyLog
    public List<DeliveryResponseDTO> 게시글목록보기(){
        List<Delivery> deliveryList = deliveryRepository.findAll();
        List<DeliveryResponseDTO>newList = deliveryList.stream()
                .map(delivery -> new DeliveryResponseDTO(delivery)).collect(Collectors.toList());
        return newList;
    }

    @MyLog
    public List<DeliveryResponseDTO> category목록보기(String category) throws Exception404{

        try {
            List<Delivery> deliveryList = deliveryRepository.findByCategory(category);
            List<DeliveryResponseDTO> newList = deliveryList.stream()
                    .map(delivery -> new DeliveryResponseDTO(delivery)).collect(Collectors.toList());
            return newList;
        }catch (Exception e) {
            throw new Exception404("게시글을 찾을 수 없습니다.");
        }
    }

    @MyLog
    public DeliveryResponseDTO.Detail 게시글상세보기(Long id){
        Delivery deliveryPS = deliveryRepository.findById(id)
                .orElseThrow(()-> new Exception404("게시글을 찾을 수 없습니다."));
        DeliveryResponseDTO.Detail detailPS = new DeliveryResponseDTO.Detail(deliveryPS);
        return detailPS;
    }

    @MyLog
    public void 게시글저장하기(DeliveryRequestDTO.Save saveDTO){
        Delivery deliveryPS = Delivery.toEntity(saveDTO);
        deliveryRepository.save(deliveryPS);
    }

    @MyLog
    public Delivery 상품찾기(Long itemId){
        Delivery deliveryPS = deliveryRepository.findById(itemId)
                .orElseThrow(() -> new Exception404("상품을 찾을 수 없습니다."));
        return deliveryPS;
    }
}
