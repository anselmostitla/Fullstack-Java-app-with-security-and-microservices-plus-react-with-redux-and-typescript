package com.submission.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// We just simply copy from ./model/User.java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
   private Integer userId;
   private String email;
   private String pass;
   private String name;
   private String role;
}

// 1a) At main file put: @EnableFeignClients
// 2a) Create the interface ./service/UserService
// 3a) Create the class ./model/UserDto
// 4a) Annotate ./model/UserDto with @FeignClient(value = "NAME-APPLICATION", url = "http://localhost:3000/")
