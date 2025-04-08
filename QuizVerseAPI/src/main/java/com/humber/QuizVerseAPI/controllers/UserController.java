package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    //constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //update user
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody(required = false) MyUser updatedUser,
                                               @RequestParam(required = false) String currentPassword) {
        String currentUsername = ((UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()).getUsername();

        String result = userService.updateUser(currentUsername, updatedUser, currentPassword);
        if (result.equals("success")) {
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}
