package com.ftn.sbnz.service.controllers;


import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
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
}
