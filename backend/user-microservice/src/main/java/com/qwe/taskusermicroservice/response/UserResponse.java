package com.qwe.taskusermicroservice.response;

import lombok.Data;

@Data
public class UserResponse {
   private Integer userId;
   private String email;
   private String pass;
   private String name;
   private String role;
}
