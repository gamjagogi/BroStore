package com.macro.hjstore.dto.user;

import com.macro.hjstore.model.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;


public class UserResponse {

    @Getter
    @Setter
    public static class LoginOutDTO{

        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z가-힣]{1,20}$", message = "한글/영문 1~20자 이내로 작성해주세요")
        private String username;

        private Long userId;

        private String userRole;

        public LoginOutDTO(String username, Long userId, String userRole) {
            this.username = username;
            this.userId = userId;
            this.userRole = userRole;
        }
    }
}
