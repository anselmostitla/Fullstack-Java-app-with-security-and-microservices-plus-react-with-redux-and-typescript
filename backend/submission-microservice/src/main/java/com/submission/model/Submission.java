package com.submission.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "subs")
public class Submission {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "submission_id")
   private Integer submissionId;

   @Column(name = "task_id")
   private Integer taskId;

   @Column(name = "github_link")
   private String githubLink;

   @Column(name = "user_id")
   private Integer userId;

   // private String status = "PENDING";
   private TaskStatus status;

   @Column(name = "submission_time")
   private LocalDateTime submissionTime;
}
