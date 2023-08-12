package com.macro.hjstore.controller;


import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.admin.AdminDTO;
import com.macro.hjstore.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
        List<AdminDTO.GetAd> slideList = adminService.광고가져오기(type);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(slideList);
        return ResponseEntity.ok().body(responseDTO);
    }

    @GetMapping("/home/card")
    public ResponseEntity<?> getCardAd(){
        String type = "card";
        List<AdminDTO.GetAd> cardList = adminService.광고가져오기(type);
        ResponseDTO<?> responseDTO = new ResponseDTO<>(cardList);
        return ResponseEntity.ok().body(responseDTO);
    }
}
