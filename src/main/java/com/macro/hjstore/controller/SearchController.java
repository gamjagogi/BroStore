package com.macro.hjstore.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class SearchController {

    @GetMapping("/search")
    public ResponseEntity<?> searching(@RequestParam("content")String content){
        return ResponseEntity.ok().build();
    }
}
