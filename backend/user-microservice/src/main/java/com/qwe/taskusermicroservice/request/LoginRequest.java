package com.qwe.taskusermicroservice.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
   String email;
   String pass;
}

// This "LoginRequest" actually contains
// 1) Variables
// 2) Constructors
// 3) Getters and Setters
// 4) But does not contain functions or methods
