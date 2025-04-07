package com.humber.QuizVerseAPI.controllers;


import com.humber.QuizVerseAPI.models.Quiz;
import com.humber.QuizVerseAPI.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    //constructor injection
    private final QuizService quizService;
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    //to get the quiz questions
    @GetMapping("/quiz")
    public List<Quiz.Question> getQuizQuestions(@RequestParam int categoryId,
                                                           @RequestParam String difficulty,
                                                           @RequestParam String type,
                                                           @RequestParam int numberOfQuestions) {
        return quizService.getQuizQuestions(categoryId, difficulty, type, numberOfQuestions);
    }

    //to get the categories
    @GetMapping("/categories")
    public List<String> getCategories() {
        return List.of("Science", "Mathematics", "History", "Animals","Sports", "Music", "Anime", "Books", "Art", "Computers" );
    }

}