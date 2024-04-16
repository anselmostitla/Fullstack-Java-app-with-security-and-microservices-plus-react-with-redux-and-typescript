package com.qwe.taskusermicroservice.service;

import com.qwe.taskusermicroservice.model.User;

import java.util.List;

public interface UserService {
   public User getUserProfile(String jwt);

   public List<User> getAllUsers();
}
