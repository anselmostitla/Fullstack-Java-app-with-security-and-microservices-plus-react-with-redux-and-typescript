package com.submission.controller;

import com.submission.model.Submission;
import com.submission.model.UserDto;
import com.submission.repository.SubmissionRepository;
import com.submission.service.SubmissionService;
import com.submission.service.TaskService;
import com.submission.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
//@RequiredArgsConstructor
public class SubmissionController {
   @Autowired
   SubmissionService submissionService;

   @Autowired
   SubmissionRepository submissionRepository;

   @Autowired
   UserService userService;

   @Autowired
   TaskService taskService;

   @PostMapping("/submissions")
   public ResponseEntity<Submission> submitTask(
           @RequestParam Integer taskId,
           @RequestParam String githubLink,
           @RequestHeader("Authorization") String jwt
   ) throws Exception{
      UserDto user = userService.getUserProfile(jwt);
      System.out.println(user);
      Submission submission = submissionService.submitTask(taskId, githubLink, user.getUserId(),jwt);
      System.out.println(submission);
      return new ResponseEntity<>(submission, HttpStatus.CREATED);
   }

   @GetMapping("/submissions/{submissionId}")
   public ResponseEntity<Submission> getSubmissionById(
           @PathVariable Integer submissionId,
           @RequestHeader("Authorization") String jwt
   ) throws Exception{
      Submission submission = submissionService.getTaskSubmissionById(submissionId);
      return new ResponseEntity<>(submission, HttpStatus.OK);
   }

   @GetMapping("/submissions")
   public ResponseEntity<List<Submission>> getAllSubmissions(@RequestHeader("Authorization") String jwt){
//      List<Submission> submissions = submissionService.getAllTaskSubmissions();
      List<Submission> submissions = submissionRepository.findAll();
      return new ResponseEntity<>(submissions, HttpStatus.OK);
   }

   @GetMapping("/submissions/tasks/{taskId}")
   public ResponseEntity<List<Submission>> getAllSubmissionByTaskId(
           @PathVariable Integer taskId,
           @RequestHeader("Authorization") String jwt
   ){
      List<Submission> submissions = submissionService.getTaskSubmissionsByTaskId(taskId);
      return new ResponseEntity<>(submissions, HttpStatus.OK);
   }

   @PutMapping("/submissions/{submissionId}")
   public ResponseEntity<Submission> acceptOrDeclineSubmission(
           @PathVariable Integer submissionId,
           @RequestParam("status") String status,
           @RequestHeader("Authorization") String jwt
   ) throws Exception{
      Submission submission = submissionService.acceptDeclineSubmission(submissionId, status);
      return new ResponseEntity<>(submission, HttpStatus.OK);
   }
}
