package com.macro.hjstore.controller;

import com.macro.hjstore.dto.ResponseDTO;
import com.macro.hjstore.dto.SearchDTO;
import com.macro.hjstore.service.SearchService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<?> searching(@RequestParam("keyword")String keyword){
        try {
            List<SearchDTO.Response> resultList = searchService.검색(keyword);
            ResponseDTO<?>responseDTO = new ResponseDTO<>(resultList);
            return ResponseEntity.ok().body(responseDTO);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
