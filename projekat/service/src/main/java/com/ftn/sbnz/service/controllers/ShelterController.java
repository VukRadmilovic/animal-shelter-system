package com.ftn.sbnz.service.controllers;


import com.ftn.sbnz.model.models.Animal;
import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import com.ftn.sbnz.model.models.backModels.ShelterInfo;
import com.ftn.sbnz.service.services.ShelterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @GetMapping(value = "/notifications")
    public ResponseEntity<?> getNotificationsAndPromotions() {
        try {
            return new ResponseEntity<>(shelterService.getNotificationsAndPromotions(), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/")
    public ResponseEntity<?> getShelter() {
        try {
            return new ResponseEntity<>(shelterService.getShelter(), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @PutMapping(value = "/deposit/{amount}")
    public ResponseEntity<?> depositMoney(@PathVariable double amount) {
        try {
            shelterService.depositMoney(amount);
            return new ResponseEntity<>("Successful deposit", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @PostMapping(value = "/shelter-animal", consumes = "application/json")
    public ResponseEntity<?> shelterAnimal(@RequestBody Animal animal) {
        try {
            shelterService.shelterAnimal(animal);
            return new ResponseEntity<>("Successful sheltering", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @PostMapping(value = "/adopt-animal", consumes = "application/json")
    public ResponseEntity<?> adoptAnimal(@RequestBody Animal animal) {
        try {
            shelterService.adoptAnimal(animal);
            return new ResponseEntity<>("Successful adoption", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/daily-report/{date}")
    public ResponseEntity<?> getDailyReport(@PathVariable String date) {
        try {
            return new ResponseEntity<>(shelterService.getDailyReport(date), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/weekly-report/{week}")
    public ResponseEntity<?> getWeeklyReport(@PathVariable String week) {
        try {
            return new ResponseEntity<>(shelterService.getWeeklyReport(week), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/monthly-report/{month}")
    public ResponseEntity<?> getMonthlyReport(@PathVariable String month) {
        try {
            return new ResponseEntity<>(shelterService.getMonthlyReport(month), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }
}
