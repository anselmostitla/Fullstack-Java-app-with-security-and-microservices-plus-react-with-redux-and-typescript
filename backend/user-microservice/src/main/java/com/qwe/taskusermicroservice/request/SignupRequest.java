package com.qwe.taskusermicroservice.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String email;
    private String pass;
    private String name;
    private String role;
}
