package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.shop.DeliveryRequestDTO;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareResponseDTO;
import com.macro.hjstore.model.board.Board;
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
        List<Delivery> deliveryList = deliveryRepository.findByAllDesc();
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
    public void 게시글저장하기(Long id,DeliveryRequestDTO.Save saveDTO){
        System.out.println(saveDTO.isHot());
        System.out.println(saveDTO.isNew());
        Delivery deliveryPS = Delivery.toEntity(id,saveDTO);
        System.out.println(deliveryPS.isHot());
        System.out.println(deliveryPS.isNew());
        deliveryRepository.save(deliveryPS);
    }

    @MyLog
    @Transactional
    public void 게시글수정하기(Long userId, Delivery deliveryPS, DeliveryRequestDTO.Update updateDTO){
        Delivery deliveryUpdated = deliveryPS.update(userId,updateDTO);
        System.out.println(deliveryUpdated.getName());
        deliveryRepository.save(deliveryUpdated);
    }

    @MyLog
    public Delivery 상품찾기(Long itemId){
        Delivery deliveryPS = deliveryRepository.findById(itemId)
                .orElseThrow(() -> new Exception404("상품을 찾을 수 없습니다."));
        return deliveryPS;
    }

    @MyLog
    public List<DeliveryResponseDTO> 판매상품가져오기(Long id){
        try {
            List<Delivery> sellingList = deliveryRepository.findByUserId(id);
            List<DeliveryResponseDTO> newList = sellingList.stream()
                    .map(delivery -> new DeliveryResponseDTO(delivery)).collect(Collectors.toList());
            return newList;
        }catch (Exception e){
            throw new Exception404("판매상품을 찾지 못했습니다."+e.getMessage());
        }
    }


    @MyLog
    @Transactional
    public void 글삭제하기(Long id){
        Delivery deliveryPS = deliveryRepository.findById(id)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다."));
        deliveryRepository.delete(deliveryPS);
    }
}
