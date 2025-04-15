package com.humber.QuizVerseAPI.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

//To get setters and getter
@Data
//To get no args constructor
@AllArgsConstructor
//To get args constructor
@NoArgsConstructor

@Document(collection = "quiz_history")

public class QuizHistory {
    //To make id field primary key
    @Id
    private String id;
    private String userId;
    private String type;
    private String difficulty;
    private String category;
    private int score;
    private int total;
    private Date date = new Date();
    private List<Quiz.Question> question;

    //Nested class for each quiz question
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Question {
        private String question;
        private String correct_answer;
        private List<String> incorrect_answers;
        private String userAnswer;

    }
}