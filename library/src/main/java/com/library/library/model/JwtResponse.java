package com.library.library.model;

import com.library.library.entity.User;

import java.io.Serializable;

//the response to send to the user, it contains the user object, excluding the password, and the token
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    private final User user;

    public JwtResponse(String jwttoken, User user) {
        this.jwttoken = jwttoken;
        this.user = user;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public User getUser(){
        return this.user;
    }
}

