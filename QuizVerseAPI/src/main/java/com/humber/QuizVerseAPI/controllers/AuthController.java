package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<?> login(@RequestBody MyUser user, HttpServletRequest request) {
        try {
            //authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            // Store authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // create session and store context
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            //get full user info from DB
            Optional<MyUser> userOp = userService.getUserByUsername(user.getUsername());
            if (userOp.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            MyUser loggedInUser = userOp.get();

            //return user details (excluding password)
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", loggedInUser.getId());
            userInfo.put("username", loggedInUser.getUsername());
            userInfo.put("role", loggedInUser.getRole());
            userInfo.put("avatar", loggedInUser.getAvatar());

            return ResponseEntity.ok(userInfo);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    //logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the session
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok("Logged out successfully!");
    }

    // still thinking about it
    //delete user
}
