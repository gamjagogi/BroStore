package com.macro.hjstore.dto.user;

import com.macro.hjstore.model.user.User;
import lombok.*;

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

    @Getter
    @AllArgsConstructor
    public static class GetProfile{

        private String email;

        private String username;

        private String birth;

        private String tel;

        private String address;

        private String detailAddress;

        public GetProfile(User user){
            this.email = user.getEmail();
            this.username = user.getUsername();
            this.birth = user.getBirth();
            this.tel = user.getTel();
            this.address = user.getAddress();
            this.detailAddress = user.getDetailAddress();
        }

    }
}
