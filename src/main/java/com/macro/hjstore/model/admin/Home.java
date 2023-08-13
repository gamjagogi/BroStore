package com.macro.hjstore.model.admin;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "home_tb")
@Entity
public class Home {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer timer;

    @Builder
    public Home(Long id, Integer timer) {
        this.id = id;
        this.timer = timer;
    }

    public static Home toEntity(Integer timer){
        return Home.builder()
                .timer(timer)
                .build();
    }
}
