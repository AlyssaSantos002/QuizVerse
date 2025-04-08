package com.humber.QuizVerseAPI.repositories;

import com.humber.QuizVerseAPI.models.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {

}