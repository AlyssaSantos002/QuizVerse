package com.humber.QuizVerseAPI.repositories;

import com.humber.QuizVerseAPI.models.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<MyUser, Integer> {
    // query to find user by username
    Optional<MyUser> findByUsername(String username);
}
