package com.submission.service;

import com.submission.model.Submission;
import com.submission.model.TaskDto;
import com.submission.model.TaskStatus;
import com.submission.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class SubmissionServiceImplementation implements SubmissionService {
   @Autowired
   SubmissionRepository submissionRepository;
   @Autowired
   TaskService taskService;

   @Override
   public Submission submitTask(Integer taskId, String githubLink, Integer userId, String jwt) throws Exception {
      TaskDto task = taskService.getTaskById(taskId, jwt).getBody();
      System.out.println("in submission service impl task: " + task);
      if(task != null){
         Submission submission = Submission.builder()
                 .taskId(taskId)
                 .githubLink(githubLink)
                 .userId(userId)
                 // .status(TaskStatus.DONE)
                 .submissionTime(LocalDateTime.now())
                 .build();
         System.out.println("In submitTask submission " + submission);

         submissionRepository.save(submission);

         return submission;
      }
      throw new Exception("Task not found with id: " + taskId);
   }

   @Override
   public Submission getTaskSubmissionById(Integer submissionId) throws Exception {
      return submissionRepository.findById(submissionId).orElseThrow(()-> new Exception("Task submission not found with id: " + submissionId));
   }

   @Override
   public List<Submission> getAllTaskSubmissions() {
      return submissionRepository.findAll();
   }

   @Override
   public List<Submission> getTaskSubmissionsByTaskId(Integer taskId) {
      return submissionRepository.findByTaskId(taskId);
   }

   @Override
   public Submission acceptDeclineSubmission(Integer id, Boolean accept) throws Exception {
      Submission submission = getTaskSubmissionById(id);

      if(accept){
         taskService.completeTask(submission.getTaskId());
      }
      return submissionRepository.save(submission);
   }
}
