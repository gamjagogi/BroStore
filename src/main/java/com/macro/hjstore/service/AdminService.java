package com.macro.hjstore.service;

import com.macro.hjstore.core.annotation.MyLog;
import com.macro.hjstore.core.exception.Exception404;
import com.macro.hjstore.dto.admin.AdminDTO;
import com.macro.hjstore.model.admin.Admin;
import com.macro.hjstore.model.admin.AdminRepository;
import com.macro.hjstore.model.admin.Home;
import com.macro.hjstore.model.admin.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepository adminRepository;

    private final HomeRepository homeRepository;

    @MyLog
    @Transactional
    public void 광고설정하기(AdminDTO.SetAd setSlide,String type){
        if(type=="slide"){
            Admin adminPS = new Admin(setSlide,type);
            adminRepository.save(adminPS);
        }else if(type=="card"){
            Admin adminPS = new Admin(setSlide,type);
            adminRepository.save(adminPS);
        }
    }

    @MyLog
    @Transactional
    public List<AdminDTO.GetAd> 슬라이드광고가져오기(String type){
        List<Admin>adminListPS = adminRepository.findByAd(type);
        List<AdminDTO.GetAd>adList = adminListPS.stream().map(admin -> new AdminDTO.GetAd(admin)).collect(Collectors.toList());
        return adList;
    }

    @MyLog
    @Transactional
    public List<AdminDTO.GetAd> 광고가져오기(String type){
        List<Admin>adminListPS = adminRepository.findByAd(type);
        List<AdminDTO.GetAd>adList = adminListPS.stream().map(admin -> new AdminDTO.GetAd(admin)).collect(Collectors.toList());
        return adList;
    }


    @MyLog
    @Transactional
    public void 광고삭제하기(Long userId){
        adminRepository.deleteById(userId);
    }

//    @MyLog
//    @Transactional
//    public void 타임세일시간설정하기(Integer timer){
//        Home configPS = Home.toEntity(timer);
//        homeRepository.save(configPS);
//    }
//
//    @MyLog
//    @Transactional
//    public Home 타임세일시간가져오기(){
//        Long id = 1L;
//        Home homePS = homeRepository.findById(id)
//                .orElseThrow(() -> new Exception404("해당 값을 찾을 수 없습니다."));
//        return homePS;
//    }
}
