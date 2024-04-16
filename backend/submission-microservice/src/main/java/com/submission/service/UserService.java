package com.submission.service;

import com.submission.model.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@FeignClient(value = "USER-MICROSERVICE", url = "http://localhost:3001/")
public interface UserService {
   @GetMapping("api/v1/users/profile")
   public UserDto getUserProfile(@RequestHeader("Authorization") String jwt);
}
