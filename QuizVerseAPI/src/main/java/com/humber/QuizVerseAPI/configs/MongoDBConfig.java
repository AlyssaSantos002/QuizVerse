package com.humber.QuizVerseAPI.configs;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class MongoDBConfig {
    @Value("${spring.data.mongodb.uri}")
    private String uri;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(uri);
    }
}
