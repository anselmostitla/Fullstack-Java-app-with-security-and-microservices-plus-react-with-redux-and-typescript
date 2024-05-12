package com.qwe.taskusermicroservice.controller;

import com.qwe.taskusermicroservice.config.JwtProvider;

import com.qwe.taskusermicroservice.model.User;

import com.qwe.taskusermicroservice.repository.UserRepository;
import com.qwe.taskusermicroservice.request.LoginRequest;
import com.qwe.taskusermicroservice.request.SignupRequest;
import com.qwe.taskusermicroservice.response.AuthResponse;
import com.qwe.taskusermicroservice.service.CustomerUserServiceImplementation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;

// READING 1

@RestController
@RequestMapping("/api/v1")
//@RequiredArgsConstructor
@AllArgsConstructor
public class AuthController {
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Autowired
   private CustomerUserServiceImplementation customerUserServiceImplementation;

   @PostMapping("/signup")
   public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest signupRequest) throws Exception {
      System.out.println("signupRequest in AuthController: " + signupRequest.toString());
      String email = signupRequest.getEmail();
      String pass = signupRequest.getPass();
      String name = signupRequest.getName();
      String role = signupRequest.getRole();

      User isEmailExist = userRepository.findByEmail(email);

      if(isEmailExist != null){
         AuthResponse authResponse = new AuthResponse();
         authResponse.setJwt("");
         authResponse.setMessage("Email already used");
         authResponse.setStatus(false);
         return new ResponseEntity<>(authResponse, HttpStatus.OK);
         // throw new Exception("Email already used");
      }

      // TODO create new user
      User createdUser = new User();
      createdUser.setEmail(email);
      createdUser.setPass(passwordEncoder.encode(pass));
      createdUser.setName(name);
      createdUser.setRole(role);

      User saveUser = userRepository.save(createdUser);

      Authentication authentication = new UsernamePasswordAuthenticationToken(email, pass);
      SecurityContextHolder.getContext().setAuthentication(authentication);

      String token = JwtProvider.generateToken(authentication);

      AuthResponse authResponse = new AuthResponse();
      authResponse.setJwt(token);
      authResponse.setMessage("Register success");
      authResponse.setStatus(true);

      return new ResponseEntity<>(authResponse, HttpStatus.OK);
   }

   @PostMapping("/signin")
   public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws Exception {
      String email = loginRequest.getEmail();
      String pass = loginRequest.getPass();

      Authentication authentication = authenticate(email, pass);

      SecurityContextHolder.getContext().setAuthentication(authentication);

      String token = JwtProvider.generateToken(authentication);

      AuthResponse authResponse = new AuthResponse();

      authResponse.setJwt(token);
      authResponse.setMessage("Login success");
      authResponse.setStatus(true);

      // return ResponseEntity.ok().body(authResponse);
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
   }

   private Authentication authenticate(String email, String pass) {
      UserDetails userDetails = customerUserServiceImplementation.loadUserByUsername(email);
      User user = userRepository.findByEmail(email);

      if(userDetails == null){
         throw new BadCredentialsException("Invalid email or password");
      }

      if( !passwordEncoder.matches(pass, userDetails.getPassword())){
         throw new BadCredentialsException("Invalid email or password");
      }

      Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
      return authentication;
   }

}
