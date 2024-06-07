package com.ftn.sbnz.model.models.backModels;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;

public class AnimalWithBreed {

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

    private AnimalType animalType;
    private AnimalBreed animalBreed;

    public AnimalWithBreed(AnimalType animalType, AnimalBreed animalBreed) {
        this.animalType = animalType;
        this.animalBreed = animalBreed;
    }
}
