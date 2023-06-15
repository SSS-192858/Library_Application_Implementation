package com.library.library.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(jwtUserDetailsService);
        authenticationProvider.setPasswordEncoder(bcryptEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests((configurer)->{
            configurer.requestMatchers("/authenticate","/register_student").permitAll()
                    .requestMatchers(HttpMethod.POST,"/register_admin").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/dummy_students").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.GET,"/dummy_admin").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/books/save/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT,"/books/updateBook/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE,"/books/deleteBook/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/books/getAll/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/books/getBook/**").permitAll()
                    .requestMatchers(HttpMethod.POST,"/student/save/**", "/student/save").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.DELETE,"/student/deleteStudent/**").permitAll()
                    .requestMatchers(HttpMethod.PUT,"/student/updateStudent/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/student/getAll/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/student/getStudent/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/requests/allRequests/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/requests/student/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/requests/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/requests/book/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST,"/requests/save/**").hasRole("STUDENT")
                    .requestMatchers(HttpMethod.DELETE,"/requests/delete/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/bookStudent/getAll").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/bookStudent/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/bookStudent/student/**").permitAll()
                    .requestMatchers(HttpMethod.GET,"/bookStudent/book/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST,"/bookStudent/save/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE,"/bookStudent/delete/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/bookStudent/accept").hasRole("ADMIN")
                    .anyRequest().authenticated();
        }).exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}