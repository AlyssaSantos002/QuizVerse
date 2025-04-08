package com.humber.QuizVerseAPI.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    private int response_code;
    private List<Question> results;  // List of questions

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    // Inner Question class that represents each quiz question
    public static class Question {

        private String type;
        private String difficulty;
        private String category;
        private String question;
        private String correct_answer;
        private List<String> incorrect_answers;
    }
}
