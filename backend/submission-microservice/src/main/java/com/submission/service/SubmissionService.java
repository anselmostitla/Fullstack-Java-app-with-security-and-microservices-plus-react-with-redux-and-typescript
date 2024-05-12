package com.submission.service;

import com.submission.model.Submission;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubmissionService {
   Submission submitTask(Integer taskId, String githubLink, Integer userId, String jwt) throws Exception;
   Submission getTaskSubmissionById(Integer submissionId) throws Exception;
   List<Submission> getAllTaskSubmissions();
   List<Submission> getTaskSubmissionsByTaskId(Integer taskId);
   Submission acceptDeclineSubmission(Integer id, Boolean accept) throws Exception;

}
