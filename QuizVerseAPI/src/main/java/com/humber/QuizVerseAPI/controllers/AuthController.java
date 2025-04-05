package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    //constructor injection
    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    //user registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody MyUser user) {
        try {
            MyUser registeredUser = userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully: " + registeredUser.getUsername());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //admin registration
    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody MyUser user) {
        try {
            MyUser registeredAdmin = userService.registerAdmin(user);
            return ResponseEntity.ok("Admin registered successfully: " + registeredAdmin.getUsername());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //custom login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            return ResponseEntity.ok("Login successful for user: " + authentication.getName());
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        String username = authentication.getName();
        return ResponseEntity.ok("Logged in as: " + username);
    }
    // still thinking about it
    //delete user
}
