package com.qwe.task.controller;

import com.qwe.task.model.Task;
import com.qwe.task.model.UserDto;
import com.qwe.task.repository.TaskRepository;
import com.qwe.task.service.TaskService;
import com.qwe.task.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserService userService;

    @Autowired
    TaskService taskService;

    @PostMapping("/tasks")
    private ResponseEntity<Task> createTask(@RequestBody Task task, @RequestHeader("Authorization") String jwt) throws Exception{
        UserDto user = userService.getUserProfile(jwt).getBody();
        if( user!=null){
            Task taskCreated = taskService.createTask(task, user.getRole());
            return new ResponseEntity<>(taskCreated, HttpStatus.CREATED);
        }
        return null;
    }

    @GetMapping("/tasks/{id}")
    private ResponseEntity<Task> getTaskById(
            @PathVariable Integer id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        Task taskFound = taskRepository.findById(id).orElseThrow(() -> new Exception("Task not found with id: " + id));
        return new ResponseEntity<>(taskFound, HttpStatus.OK);
    }

    @GetMapping("/tasks")
    private ResponseEntity<List<Task>> getAllTasks(@RequestHeader("Authorization") String jwt) {
        List<Task> tasks = taskRepository.findAll();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/tasks/assigned")
    private ResponseEntity<List<Task>> getAssignedTasksToAuthenticatedUser(
        @RequestHeader("Authorization") String jwt,
        @RequestParam(required = false) String status
    ) throws Exception {
        UserDto user = userService.getUserProfile(jwt).getBody();
        List<Task> tasks = taskService.getAllAssignedTasksToCurrentAuthenticatedUser(user.getUserId(), status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/tasks/{taskId}/users/{userId}")
    private ResponseEntity<Task> assignTaskToUser(
            @PathVariable Integer taskId,
            @PathVariable Integer userId
    ) throws Exception{
        Task task = taskService.assignTaskToUser(taskId, userId);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/tasks/{taskId}")
    private ResponseEntity<Task> updateTask(
            @PathVariable Integer taskId,
            @RequestBody Task task,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        // Only ADMIN can update task or everyone?
        UserDto user = userService.getUserProfile(jwt).getBody();
        Task updatedTask = taskService.updateTask(taskId, task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @PutMapping("tasks/complete/{taskId}")
    private ResponseEntity<Task> completeTask(@PathVariable Integer taskId) throws Exception{
        Task completedTask = taskService.completeTask(taskId);
        return new ResponseEntity<>(completedTask, HttpStatus.OK);
    }

    @DeleteMapping("/tasks/{taskId}")
    private ResponseEntity<String> deleteTask(@PathVariable Integer taskId){
        taskRepository.deleteById(taskId);
        return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    }
}
