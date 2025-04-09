package com.humber.QuizVerseAPI.controllers;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    //constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@RequestParam String id){
        try{
            Optional<MyUser> user = userService.getUserById(id);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            MyUser loggedInUser = user.get();

            //return user details (excluding password)
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", loggedInUser.getId());
            userInfo.put("username", loggedInUser.getUsername());
            userInfo.put("role", loggedInUser.getRole());
            userInfo.put("avatar", loggedInUser.getAvatar());

            return ResponseEntity.ok(userInfo);
        }catch(Exception e){
            return ResponseEntity.badRequest().body("User not found!");
        }

    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateUserById(@RequestBody MyUser updatedUser,
                                            @RequestParam(required = false) String currentPassword) {
        if (updatedUser.getId() == null) {
            return ResponseEntity.badRequest().body("User ID is required.");
        }

        String result = userService.updateUserById(updatedUser.getId(), updatedUser, currentPassword);
        if ("success".equals(result)) {
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}
