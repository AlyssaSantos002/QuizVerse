package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.QuizHistory;
import com.humber.QuizVerseAPI.services.QuizHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

        List<QuizHistory> existing = quizHistoryService.getQuizHistory(quizHistory.getUserId());
        for (QuizHistory quiz : existing) {
            if (quiz.getCategory().equals(quizHistory.getCategory())
                    && quiz.getDifficulty().equals(quizHistory.getDifficulty())
                    && quiz.getType().equals(quizHistory.getType())) {
                return quiz;
            }
        }


        // Set total based on questions size
        if (quizHistory.getQuestion() != null) {
            quizHistory.setTotal(quizHistory.getQuestion().size());
        }

        return quizHistoryService.saveQuizHistory(quizHistory);
    }

    //To update a quiz history
    @PutMapping("quiz-history/update/{id}")
    public ResponseEntity<?> updateHistory(@PathVariable String id, @RequestBody QuizHistory updateQuizHistory) {
        Optional<QuizHistory> quizHistory = quizHistoryService.getQuizHistoryById(id);
        if (quizHistory.isPresent()) {
            QuizHistory history = quizHistory.get();
            history.setQuestion(updateQuizHistory.getQuestion());
            history.setTotal(updateQuizHistory.getTotal());
            history.setScore(updateQuizHistory.getScore());
            quizHistoryService.saveQuizHistory(history);
            return ResponseEntity.ok("Quiz history updated");
        } else {
            return ResponseEntity.status(404).body("Quiz history not found");
        }
    }

    @DeleteMapping("/quiz-history/delete/{id}")
    public ResponseEntity<?> deleteHistory(@PathVariable String id) {
        boolean deleted = quizHistoryService.deleteQuizHistory(id);
        if (deleted) {
            return ResponseEntity.ok("Quiz history deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Quiz history not found");
        }
    }
}


