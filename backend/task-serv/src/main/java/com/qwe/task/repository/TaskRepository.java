package com.qwe.task.repository;

import com.qwe.task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    public Task findByTitle(String title);
    public List<Task> findByAssignedUserId(Integer assignedUser);
}
