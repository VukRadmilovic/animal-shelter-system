package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalType;

public class FoodAvailableForAnimal {
    private int portionCount;
    private AnimalType animalType;

    public FoodAvailableForAnimal(int portionCount, AnimalType animalType) {
        this.portionCount = portionCount;
        this.animalType = animalType;
    }

    public int getPortionCount() {
        return portionCount;
    }

    public void setPortionCount(int portionCount) {
        this.portionCount = portionCount;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }
}
