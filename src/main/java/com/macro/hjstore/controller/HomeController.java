package com.macro.hjstore.controller;


import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.admin.AdminDTO;
import com.macro.hjstore.model.admin.Home;
import com.macro.hjstore.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class HomeController {

    private final AdminService adminService;


    @GetMapping("/home/slide")
    public ResponseEntity<?> getSlideAd(){
        String type = "slide";
        List<AdminDTO.GetAd> slideList = adminService.슬라이드광고가져오기(type);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(slideList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/home/card")
    public ResponseEntity<?> getCardAd(){
        String type = "card";
        List<AdminDTO.GetAd>adList = adminService.광고가져오기(type);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(adList);
        return ResponseEntity.ok().body(responseDTO);
    }

//    @GetMapping("/home/count")
//    public ResponseEntity<?> getTimeCount(){
//        Home homePS = adminService.타임세일시간가져오기();
//        Integer timer = homePS.getTimer();
//        ResponseDTO<?>responseDTO = new ResponseDTO<>(timer);
//        return ResponseEntity.ok().body(responseDTO);
//    }
}
