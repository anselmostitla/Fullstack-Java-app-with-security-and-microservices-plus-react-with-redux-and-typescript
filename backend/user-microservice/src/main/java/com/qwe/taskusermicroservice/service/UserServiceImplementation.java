package com.qwe.taskusermicroservice.service;

import com.qwe.taskusermicroservice.config.JwtProvider;
import com.qwe.taskusermicroservice.model.User;
import com.qwe.taskusermicroservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService{

   @Autowired
   private UserRepository userRepository;
  
   @Override
   public User getUserProfile(String jwt) {
      String email = JwtProvider.getEmailFromJwtToken(jwt);
      User user = userRepository.findByEmail(email);

      return user;
   }

   @Override
   public List<User> getAllUsers() {
      List<User> users = userRepository.findAll();
      return users;
   }
   
}
