package com.humber.QuizVerseAPI.services;

import com.humber.QuizVerseAPI.models.QuizHistory;
import com.humber.QuizVerseAPI.repositories.QuizHistoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


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

    //To get quiz history by id
    public Optional<QuizHistory> getQuizHistoryById(String id) {
        return quizHistoryRepository.findById(id);
    }

    public boolean deleteQuizHistory(String id) {
        Optional<QuizHistory> quizHistory = quizHistoryRepository.findById(id);
        if (quizHistory.isPresent()) {
            quizHistoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    //saves a new quiz the user done
    public  QuizHistory saveQuizHistory(QuizHistory quizHistory) {
        return quizHistoryRepository.save(quizHistory);
    }

}
