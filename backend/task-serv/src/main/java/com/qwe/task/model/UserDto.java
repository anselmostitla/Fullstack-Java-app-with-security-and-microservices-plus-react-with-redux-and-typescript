package com.qwe.task.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Integer userId;
    private String email;
    private String pass;
    private String name;
    private String role;

    public String getRole() {
        return role;
    }
}
