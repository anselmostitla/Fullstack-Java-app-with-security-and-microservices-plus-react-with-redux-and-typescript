package com.qwe.task.service;

import com.qwe.task.model.Task;
import com.qwe.task.model.TaskStatus;
import com.qwe.task.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    public Task findByTitle(String title){
        return taskRepository.findByTitle(title);
    }

    public Task createTask(Task task, String requestedRole) throws Exception{
        if(!requestedRole.equals("ADMIN")){
            throw new Exception("Only ADMIN can create tasks");
        }
        System.out.println(task.toString());
        task.setStatus(TaskStatus.PENDING);
        System.out.println(task.toString());
        taskRepository.save(task);
        System.out.println(task.toString());
        return task;
    }

    public List<Task> getAllAssignedTasksToCurrentAuthenticatedUser(
            Integer userId,
            String status
    ){
        List<Task> assignedTasks = taskRepository.findByAssignedUserId(userId);
        List<Task> tasks = assignedTasks.stream().filter(
                task -> status==null || task.getStatus().equals(status)
        ).collect(Collectors.toList());
        return tasks;
    }

    public Task assignTaskToUser(Integer taskId, Integer userId) throws Exception{
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new Exception("Tasks not found with id: " + taskId));
        task.setAssignedUserId(userId);
        taskRepository.save(task);
        return task;
    }

    public Task updateTask(Integer taskId, Task task) throws Exception{
        Task existingTask = taskRepository.findById(taskId).orElseThrow(
                ()-> new Exception("Task not found with id: " + taskId)
        );

        if(task.getTitle()!=null){existingTask.setTitle(task.getTitle());}
        if(task.getDescription()!=null){existingTask.setDescription(task.getDescription());}
        if(task.getImage()!=null){existingTask.setImage(task.getImage());}
        if(task.getStatus()!=null){existingTask.setStatus(task.getStatus());}
        if(task.getDeadline()!=null){existingTask.setDeadline(task.getDeadline());}
        if(task.getAssignedUserId()!=null){
            existingTask.setAssignedUserId(task.getAssignedUserId());
            existingTask.setStatus(TaskStatus.ASSIGNED);
        }

        taskRepository.save(existingTask);
        return existingTask;
    }

    public Task completeTask(Integer taskId) throws Exception{
        Task task = taskRepository.findById(taskId).orElseThrow(
                ()-> new Exception("Task not found with id: " + taskId)
        );
        task.setStatus(TaskStatus.DONE);
        taskRepository.save(task);
        return task;
    }
}
