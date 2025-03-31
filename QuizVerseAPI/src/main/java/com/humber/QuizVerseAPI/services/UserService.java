package com.humber.QuizVerseAPI.services;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    //constructor injection
    public UserService(UserRepository userRepository,  BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //save user to the database - register
    public MyUser registerUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Create a new MyUser instance
        MyUser newUser = new MyUser();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        newUser.setRole("USER"); // Assign default role

        return userRepository.save(newUser); // Save and return the new user
    }

}
