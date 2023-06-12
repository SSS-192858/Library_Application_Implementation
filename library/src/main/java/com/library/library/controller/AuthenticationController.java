package com.library.library.controller;

import com.library.library.config.JwtTokenUtil;
import com.library.library.model.JwtRequest;
import com.library.library.model.JwtResponse;
import com.library.library.model.UserDTO;
import com.library.library.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/register_user", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.saveUser(user));
    }

    @RequestMapping(value = "/register_doctor", method = RequestMethod.POST)
    public ResponseEntity<?> saveDoctor(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.saveDoctor(user));
    }

    @RequestMapping(value = "/register_admin", method = RequestMethod.POST)
    public ResponseEntity<?> saveAdmin(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.saveAdmin(user));
    }

    @RequestMapping(value = "/dummy_users", method = RequestMethod.GET)
    public String userPage(){
        return "Hello User";
    }
    @RequestMapping(value = "/dummy_docs", method = RequestMethod.GET)
    public String doctorPage(){
        return "Hello Doc";
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
}
