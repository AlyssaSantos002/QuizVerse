package com.humber.QuizVerseAPI.services;

import com.humber.QuizVerseAPI.models.MyUser;
import com.humber.QuizVerseAPI.repositories.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {


    private final UserRepository userRepository;

    //constructor injection
    public MyUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> userOp = userRepository.findByUsername(username);

        if (userOp.isPresent()) {
            MyUser user = userOp.get();

            return User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();
        }else{
            throw new UsernameNotFoundException("User not found!");
        }

    }
}
