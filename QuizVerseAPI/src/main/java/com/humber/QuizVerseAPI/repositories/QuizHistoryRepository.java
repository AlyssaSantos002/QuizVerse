package com.humber.QuizVerseAPI.repositories;

import com.humber.QuizVerseAPI.models.QuizHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuizHistoryRepository extends MongoRepository<QuizHistory, String> {
    List<QuizHistory> findByUserId(String userId);
}
