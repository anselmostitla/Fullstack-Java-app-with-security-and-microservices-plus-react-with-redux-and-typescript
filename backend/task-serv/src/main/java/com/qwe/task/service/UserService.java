package com.qwe.task.service;

import com.qwe.task.model.UserDto;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@FeignClient(value = "user-microservice", url = "http://localhost:3001/")
public interface UserService {

    @GetMapping("/api/v1/users/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt);

    //@GetMapping("/api/v1/users/")
    //UserDto getUserById(Integer userId);
}

// 1a) At main file put: @EnableFeignClients
// 2a) Create the interface ./service/UserService
// 3a) Create the class ./model/UserDto
// 4a) Annotate ./service/UserService with @FeignClient(value = "APPLICATION-NAME", url = "http://localhost:3001/")

