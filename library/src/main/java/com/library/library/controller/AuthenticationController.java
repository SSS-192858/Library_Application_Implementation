package com.library.library.controller;

import com.library.library.config.JwtTokenUtil;
import com.library.library.entity.User;
import com.library.library.model.JwtRequest;
import com.library.library.model.JwtResponse;
import com.library.library.model.UserDTO;
import com.library.library.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        final String token = tokenGenerator(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        User user = this.userDetailsService.getUserByUsername(authenticationRequest.getUsername());
        if (user == null){
            throw new UsernameNotFoundException("Invalid username or password");
        }
        return ResponseEntity.ok(new JwtResponse(token, user));
    }

    @Transactional
    @RequestMapping(value = "/register_student", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody JwtRequest user) throws Exception {
        UserDTO dto = new UserDTO();
        dto.setPassword(user.getPassword());
        dto.setUsername(user.getUsername());
        User user1 = this.userDetailsService.saveUser(dto);
        final String token = tokenGenerator(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(new JwtResponse(token, user1));
    }

    @RequestMapping(value = "/register_admin", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> saveAdmin(@RequestBody JwtRequest user) throws Exception {
        UserDTO dto = new UserDTO();
        dto.setPassword(user.getPassword());
        dto.setUsername(user.getUsername());
        User user1 = this.userDetailsService.saveAdmin(dto);
        final String token = tokenGenerator(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(new JwtResponse(token, user1));
    }

    @RequestMapping(value = "/dummy_students", method = RequestMethod.GET)
    public String userPage(){
        return "Hello Student";
    }

    @RequestMapping(value = "/dummy_admin", method = RequestMethod.GET)
    public String adminPage(){
        return "Hello Admin";
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    private String tokenGenerator(String username, String password) throws Exception{
        authenticate(username, password);
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);

        return jwtTokenUtil.generateToken(userDetails);
    }
}
