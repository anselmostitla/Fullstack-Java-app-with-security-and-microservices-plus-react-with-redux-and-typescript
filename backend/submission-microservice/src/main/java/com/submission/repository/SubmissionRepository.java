package com.submission.repository;

import com.submission.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Integer> {
   List<Submission> findByTaskId(Integer taskId);
}
