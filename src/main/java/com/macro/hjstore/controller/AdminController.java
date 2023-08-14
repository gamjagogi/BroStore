package com.macro.hjstore.controller;

import com.macro.hjstore.core.auth.session.MyUserDetails;
import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.admin.AdminDTO;
import com.macro.hjstore.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AdminController {

    private final AdminService adminService;

    private int counter = 0;

    @PostMapping("/admin/slide/save/{userId}")
    public ResponseEntity<?> createSlide(@PathVariable("userId") Long userId, @RequestBody AdminDTO.SetAd setSlide
            , @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            try {
                String type = "slide";
                adminService.광고설정하기(setSlide,type);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/admin/slide/{userId}")
    public ResponseEntity<?> getSlide(@PathVariable("userId") Long userId, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            String type = "slide";
            List<AdminDTO.GetAd> slideList = adminService.광고가져오기(type);
            ResponseDTO<?> responseDTO = new ResponseDTO<>(slideList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/admin/slide/delete/{userId}")
    public ResponseEntity<?> deleteAd(@PathVariable("userId") Long userId, @RequestBody Long adId, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            System.out.println(adId);
            adminService.광고삭제하기(adId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/admin/card/save/{userId}")
    public ResponseEntity<?> createCard(@PathVariable("userId") Long userId, @RequestBody AdminDTO.SetAd setSlide
            , @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            try {
                String type = "card";
                adminService.광고설정하기(setSlide,type);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/admin/card/{userId}")
    public ResponseEntity<?> getCard(@PathVariable("userId") Long userId, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            String type = "card";
            List<AdminDTO.GetAd> cardList = adminService.광고가져오기(type);
            ResponseDTO<?> responseDTO = new ResponseDTO<>(cardList);
            return ResponseEntity.ok().body(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/admin/card/delete/{userId}")
    public ResponseEntity<?> deleteCardAd(@PathVariable("userId") Long userId, @RequestBody Long adId, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        if (myUserDetails.getUser().getId() == userId) {
            System.out.println(adId);
            adminService.광고삭제하기(adId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
