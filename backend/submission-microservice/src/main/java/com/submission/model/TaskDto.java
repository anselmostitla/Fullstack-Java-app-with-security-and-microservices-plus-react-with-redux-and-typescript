package com.submission.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

   private Integer taskId;
   private String title;
   private String description;
   private String image;
   private Integer assignedUserId;
   private List<String> tags = new ArrayList<>();
   private TaskStatus taskStatus;
   private LocalDateTime deadline;
   private LocalDateTime createdAt;
}
