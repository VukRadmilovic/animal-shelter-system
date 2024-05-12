package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.ArrayList;
import java.util.List;

public class Recommendation {
    private Long userId;
    private final List<AnimalBreed> animalBreeds;
    private final String breeds;

    public Recommendation(Long userId, String breeds) {
        this.userId = userId;
        this.breeds = breeds;
        this.animalBreeds = new ArrayList<>();
        String[] tokens = breeds.split(",");
        for(String breed : tokens) {
            this.animalBreeds.add(AnimalBreed.valueOf(breed));
        }
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<AnimalBreed> getAnimalBreeds() {
        return animalBreeds;
    }

}
