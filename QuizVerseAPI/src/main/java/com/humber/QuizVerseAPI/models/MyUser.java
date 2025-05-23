package com.humber.QuizVerseAPI.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "myUsers")
public class MyUser {
    @Id
    private String id;
    private String username;
    private String password;
    private String role;
    private String avatar;
}
