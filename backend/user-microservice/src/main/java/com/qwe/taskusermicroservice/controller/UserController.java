package com.qwe.taskusermicroservice.controller;

import com.qwe.taskusermicroservice.model.User;
import com.qwe.taskusermicroservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// READING 2

@RestController
@RequestMapping("/api/v1")
public class UserController {

   @Autowired
   public UserService userService;

   @GetMapping("/users/profile")
   public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt){
      User user = userService.getUserProfile(jwt);
      // return ResponseEntity.ok().body(user);
      return new ResponseEntity<>(user, HttpStatus.OK);
   }

   @GetMapping("/users")
   public ResponseEntity<List<User>> getUsers(){
      List<User> users = userService.getAllUsers();
      return new ResponseEntity<>(users, HttpStatus.OK);
   }

//   @DeleteMapping("/Users/{email}")
//   public UserDetails deleteUserByEmail(){
//      return null;
//   }

}
