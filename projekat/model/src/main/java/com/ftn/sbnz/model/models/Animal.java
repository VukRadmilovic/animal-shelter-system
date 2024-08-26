package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;

public class Animal {
    private AnimalType animalType;
    private AnimalBreed animalBreed;

    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public AnimalBreed getAnimalBreed() {
        return animalBreed;
    }

    public void setAnimalBreed(AnimalBreed animalBreed) {
        this.animalBreed = animalBreed;
    }

    public Animal(AnimalType animalType, AnimalBreed animalBreed) {
        this.animalType = animalType;
        this.animalBreed = animalBreed;
    }
}
