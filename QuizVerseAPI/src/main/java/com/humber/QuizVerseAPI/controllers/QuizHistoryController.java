package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.QuizHistory;
import com.humber.QuizVerseAPI.services.QuizHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizHistoryController {

    //constructor injection
    private final QuizHistoryService quizHistoryService;
    public QuizHistoryController(QuizHistoryService quizHistoryService) {
        this.quizHistoryService = quizHistoryService;
    }

    //To retrieve quiz history by user id
    @GetMapping("/quiz-history/{userId}")
    public List<QuizHistory> getQuizHistory(@PathVariable String userId) {
        return quizHistoryService.getQuizHistory(userId);
    }

    //To save the quiz
    @PostMapping("/quiz-history")
    public QuizHistory saveQuizHistory(@RequestBody QuizHistory quizHistory) {

        //if user id is null or empty it will throw error
        //Only logged-in users quiz will have quiz history
        if (quizHistory.getUserId() == null || quizHistory.getUserId().isEmpty()) {
            throw new IllegalArgumentException("User must be logged in to save this quiz history");
        }
        return quizHistoryService.saveQuizHistory(quizHistory);
    }
}


