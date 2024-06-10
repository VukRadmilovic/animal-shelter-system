package com.ftn.sbnz.service.controllers;


import com.ftn.sbnz.model.models.Response;
import com.ftn.sbnz.model.models.backModels.Questionnaire;
import com.ftn.sbnz.model.models.backModels.Suggestions;
import com.ftn.sbnz.service.services.SuggestionsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping(value = "/api/questionnaire")
public class SuggestionsController {

    private final SuggestionsService suggestionsService;

    public SuggestionsController(SuggestionsService suggestionsService) {
        this.suggestionsService = suggestionsService;
    }

    @PostMapping(value = "/response", consumes = "application/json")
    public ResponseEntity<?> sendResponse(@RequestBody Response response) {
        try {
            suggestionsService.submitResponse(response);
            return new ResponseEntity<>("Successful response submission.", HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/suggestions/{userId}")
    public ResponseEntity<?> getSuggestions(@PathVariable Long userId) {
        try {
            Suggestions suggestions = suggestionsService.getSuggestions(userId);
            return new ResponseEntity<>(suggestions, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/questions")
    public ResponseEntity<?> getQuestions() {
        try {
            Questionnaire questionnaire = suggestionsService.getQuestions();
            return new ResponseEntity<>(questionnaire, HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }

    @GetMapping(value = "/global-chart")
    public ResponseEntity<?> getGlobalChart() {
        try {
            return new ResponseEntity<>(suggestionsService.getGlobalChart(), HttpStatus.OK);
        } catch (ResponseStatusException ex) {
            return new ResponseEntity<>(ex.getReason(), ex.getStatus());
        }
    }
}
