package com.humber.QuizVerseAPI.services;

import com.humber.QuizVerseAPI.models.Quiz;
import com.humber.QuizVerseAPI.repositories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class QuizService {

    private final String API_URL = "https://opentdb.com/api.php";

   private final QuizRepository quizRepository;
   public QuizService(QuizRepository quizRepository) {
       this.quizRepository = quizRepository;
   }

    // Fetch quiz questions from the API
    public List<Quiz.Question> getQuizQuestions(int categoryId, String difficulty, String type, int numberOfQuestions) {
        // Use RestTemplate to call Trivia API
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("%s?amount=%d&category=%d&difficulty=%s&type=%s",
                API_URL, numberOfQuestions, categoryId, difficulty, type);

        // Fetch the response from the API
        Quiz response = restTemplate.getForObject(url, Quiz.class);

        if (response != null && response.getResults() != null) {
            List<Quiz.Question> questions = response.getResults();

            return questions;
        }
        return null;
    }
}
