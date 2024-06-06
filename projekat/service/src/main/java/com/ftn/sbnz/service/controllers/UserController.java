package com.ftn.sbnz.service.controllers;

import com.ftn.sbnz.model.models.backModels.NewUser;
import com.ftn.sbnz.model.models.backModels.UserCredentials;
import com.ftn.sbnz.service.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;
    @PostMapping(value = "/new", consumes = "application/json")
    public ResponseEntity<?> register(@RequestBody NewUser newUser) {
        try {
            userService.register(newUser);
            return new ResponseEntity<>("Successful registration!", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody UserCredentials userCredentials) {
        try {
            String fullName = userService.login(userCredentials);
            return new ResponseEntity<>(fullName, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }
}
