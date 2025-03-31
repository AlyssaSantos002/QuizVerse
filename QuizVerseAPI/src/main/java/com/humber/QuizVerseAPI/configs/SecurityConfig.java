package com.humber.QuizVerseAPI.configs;

import com.humber.QuizVerseAPI.services.MyUserDetailService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MyUserDetailService myUserDetailService;

    //constructor injection
    public SecurityConfig(MyUserDetailService myUserDetailService)   {
        this.myUserDetailService = myUserDetailService;
    }


}
