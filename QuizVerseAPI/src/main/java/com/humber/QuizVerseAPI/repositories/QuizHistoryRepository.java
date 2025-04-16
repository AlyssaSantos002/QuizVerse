package com.humber.QuizVerseAPI.repositories;

import com.humber.QuizVerseAPI.models.QuizHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface QuizHistoryRepository extends MongoRepository<QuizHistory, String> {
    List<QuizHistory> findByUserId(String userId);

    Optional<QuizHistory> findById(String id);
}
