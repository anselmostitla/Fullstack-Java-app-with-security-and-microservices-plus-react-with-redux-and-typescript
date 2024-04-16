package com.qwe.taskusermicroservice.controller;

import com.qwe.taskusermicroservice.config.JwtProvider;

import com.qwe.taskusermicroservice.model.User;

import com.qwe.taskusermicroservice.repository.UserRepository;
import com.qwe.taskusermicroservice.request.LoginRequest;
import com.qwe.taskusermicroservice.response.AuthResponse;
import com.qwe.taskusermicroservice.service.CustomerUserServiceImplementation;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Autowired
   private CustomerUserServiceImplementation customerUserServiceImplementation;

//   @Autowired
//   private LoginRequest loginRequest;

   @PostMapping("/signup")
   public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

      String email = user.getEmail();
      String pass = user.getPass();
      String name = user.getName();
      String role = user.getRole();

      User isEmailExist = userRepository.findByEmail(email);

      if(isEmailExist != null){
         throw new Exception("Email already used");
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
//
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
   }

   @GetMapping("/signin")
   public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws Exception {
      String email = loginRequest.getEmail();
      String pass = loginRequest.getPass();

//      User user = userRepository.findByEmail(email);

      Authentication authentication = authenticate(email, pass);


//      if(user == null){
//         throw new Exception("No USER with such credentials");
//      }
//
//      Authentication authentication = new UsernamePasswordAuthenticationToken(email, passwordEncoder.encode(pass));


      SecurityContextHolder.getContext().setAuthentication(authentication);

      String token = JwtProvider.generateToken(authentication);

      AuthResponse authResponse = new AuthResponse();

      authResponse.setJwt(token);
      authResponse.setMessage("Login success");
      authResponse.setStatus(true);


      return ResponseEntity.ok().body(authResponse);


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
