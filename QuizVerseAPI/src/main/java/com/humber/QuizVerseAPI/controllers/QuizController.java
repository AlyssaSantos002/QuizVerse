package com.humber.QuizVerseAPI.controllers;


import com.humber.QuizVerseAPI.models.Category;
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
    public List<Category> getCategories() {
        return List.of(
                new Category(17,"Science", "Science.jpeg"),
                new Category(19, "Math", "Math.jpg"),
                new Category(23, "History", "History.jpeg"),
                new Category(27, "Animals", "Animals.jpeg"),
                new Category(21, "Sports", "Sports.jpeg"),
                new Category(12, "Music", "Music.jpeg"),
                new Category(31, "Anime & Manga", "Anime.jpg"),
                new Category(10, "Books", "Books.jpeg"),
                new Category(25, "Art", "Art.jpeg"),
                new Category(18, "Computers", "Computers.jpeg")
        );
    }

}