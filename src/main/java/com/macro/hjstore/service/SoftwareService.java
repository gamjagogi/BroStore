package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.shop.DeliveryResponseDTO;
import com.macro.hjstore.dto.shop.SoftwareRequestDTO;
import com.macro.hjstore.dto.shop.SoftwareResponseDTO;
import com.macro.hjstore.model.deliveryProduct.Delivery;
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
public class SoftwareService {

    private final SoftwareRepository softwareRepository;

    @MyLog
    public List<SoftwareResponseDTO> 게시글목록보기(){
        List<Software> softwareList = softwareRepository.findByAllDesc();
        List<SoftwareResponseDTO>newList = softwareList.stream()
                .map(software -> new SoftwareResponseDTO(software)).collect(Collectors.toList());
        return newList;
    }

    @MyLog
    public List<SoftwareResponseDTO> category목록보기(String category) throws Exception404{

        try {
            List<Software> softwareList = softwareRepository.findByCategory(category);
            List<SoftwareResponseDTO> newList = softwareList.stream()
                    .map(software -> new SoftwareResponseDTO(software)).collect(Collectors.toList());
            return newList;
        }catch (Exception e) {
            throw new Exception404("게시글을 찾을 수 없습니다.");
        }
    }

    @MyLog
    public SoftwareResponseDTO.Detail 게시글상세보기(Long id){
        Software softwarePS = softwareRepository.findById(id)
                .orElseThrow(()-> new Exception404("게시글을 찾을 수 없습니다."));
        SoftwareResponseDTO.Detail detailPS = new SoftwareResponseDTO.Detail(softwarePS);
        return detailPS;
    }

    @MyLog
    public void 게시글저장하기(Long userId,SoftwareRequestDTO.Save saveDTO){
        Software savePS = Software.toEntity(userId,saveDTO);
        softwareRepository.save(savePS);
    }

    @MyLog
    public Software 상품찾기(Long itemId){
        Software softwarePS = softwareRepository.findById(itemId)
                .orElseThrow(() -> new Exception404("상품을 찾을 수 없습니다."));
        return softwarePS;
    }

    @MyLog
    public List<SoftwareResponseDTO> 판매상품가져오기(Long id){
        try {
            List<Software> sellingList = softwareRepository.findByUserId(id);
            List<SoftwareResponseDTO> newList = sellingList.stream()
                    .map(software -> new SoftwareResponseDTO(software)).collect(Collectors.toList());
            return newList;
        }catch (Exception e){
            throw new Exception404("판매상품을 찾지 못했습니다."+e.getMessage());
        }
    }

    @MyLog
    @Transactional
    public void 게시글수정하기(Software software){
        softwareRepository.save(software);
    }

    @MyLog
    @Transactional
    public void 글삭제하기(Long id){
        Software softwarePS = softwareRepository.findById(id)
                .orElseThrow(() -> new Exception404("해당 글을 찾을 수 없습니다."));
        softwareRepository.delete(softwarePS);
    }
}
