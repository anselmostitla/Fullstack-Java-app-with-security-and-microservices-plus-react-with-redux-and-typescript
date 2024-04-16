package com.submission.service;

import com.submission.model.TaskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@FeignClient(name = "SUBMISSION-SERVICE", url = "http://localhost:3002")
public interface TaskService {
   @GetMapping("/api/v1/tasks/{id}")
   public ResponseEntity<TaskDto> getTaskById(@PathVariable Integer id, @RequestHeader("Authorization") String jwt);
   // instead of just @GetMapping("/{id}") we need to give the full path
   // instead of <Task> we put <TaskDto>

   @PutMapping("api/v1/tasks/complete/{task_id}")
   public ResponseEntity<TaskDto> completeTask(@PathVariable Integer task_id) throws Exception;
}

// 1a) add @EnableFeignClients to main file SubmissionApplication
// 2a) add @FeignClient to ./service/TaskService.java
// 3a) go to task-microservice and copy from taskController the signature:
/*
  @GetMapping("/{id}")
  public ResponseEntity<Task> getTaskById(@PathVariable Integer id, @RequestHeader("Authorization") String jwt)

  // instead of just @GetMapping("/{id}") we need to give the full path @GetMapping("/api/v1/tasks/{id}")
  // instead of <Task> we put <TaskDto>
*/

/*
  // 4a go to task-microservice and copy from task controller the signature:

  @PutMapping("/{task_id}/complete")
  public ResponseEntity<Task> completeTask(@PathVariable Integer task_id) throws Exception

  // instead of just @PutMapping("/{task_id}/complete") we need to give the full path @PutMapping("api/v1/tasks/{task_id}/complete")
  // instead of <Task> we put <TaskDto>
*/
