package com.humber.QuizVerseAPI.services;

import com.humber.QuizVerseAPI.models.QuizHistory;
import com.humber.QuizVerseAPI.repositories.QuizHistoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class QuizHistoryService {

    //constructor injection
    private final QuizHistoryRepository quizHistoryRepository;
    public QuizHistoryService(QuizHistoryRepository quizHistoryRepository) {
        this.quizHistoryRepository = quizHistoryRepository;
    }

    //to get quiz history by user id
    public List<QuizHistory> getQuizHistory(String userId) {
        return quizHistoryRepository.findByUserId(userId);
    }

    //saves a new quiz the user done
    public  QuizHistory saveQuizHistory(QuizHistory quizHistory) {
        return quizHistoryRepository.save(quizHistory);
    }

}
