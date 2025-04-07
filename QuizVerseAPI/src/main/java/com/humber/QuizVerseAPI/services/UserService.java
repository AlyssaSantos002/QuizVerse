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

    //register user
    public MyUser registerUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        //create a new user
        MyUser newUser = new MyUser();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword())); //encrypt password
        newUser.setRole("USER"); //assign default role
        newUser.setAvatar(user.getAvatar()); //set the user's avatar

        return userRepository.save(newUser); // Save and return the new user
    }

    //register admin
    public MyUser registerAdmin(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // create a new user
        MyUser newUser = new MyUser();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword())); //encrypt password
        newUser.setRole("ADMIN"); //assign default role
        newUser.setAvatar(user.getAvatar()); //set the user's avatar

        return userRepository.save(newUser); // Save and return the new user
    }

    //get user details
    public Optional<MyUser> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }




}
