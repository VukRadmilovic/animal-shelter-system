package com.ftn.sbnz.service.controllers;


import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import com.ftn.sbnz.model.models.backModels.ShelterInfo;
import com.ftn.sbnz.model.models.backModels.Suggestions;
import com.ftn.sbnz.service.services.ShelterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping(value = "/api/shelter")
public class ShelterController {

    private final ShelterService shelterService;
    public ShelterController(ShelterService shelterService) {
        this.shelterService = shelterService;
    }

    @GetMapping(value = "/animalsBreeds")
    public ResponseEntity<?> getAnimalsWithBreeds() {
        try {
            AnimalsWithBreeds animals = shelterService.getAnimalsWithBreeds();
            return new ResponseEntity<>(animals, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> registerShelter(@RequestBody ShelterInfo shelterInfo) {
        try {
            shelterService.registerShelter(shelterInfo);
            return new ResponseEntity<>("Successful shelter initialization", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/exists")
    public ResponseEntity<?> checkIfShelterExists() {
        try {
            boolean exists = shelterService.checkIfShelterExists();
            return new ResponseEntity<>(exists, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }
}
