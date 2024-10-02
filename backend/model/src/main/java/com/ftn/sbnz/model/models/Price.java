package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalType;

public class Price {
    private AnimalType animalType;
    private double pricePerPortion;

    public Price(AnimalType animalType, double pricePerPortion) {
        this.animalType = animalType;
        this.pricePerPortion = pricePerPortion;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public double getPricePerPortion() {
        return pricePerPortion;
    }

    public void setPricePerPortion(double pricePerPortion) {
        this.pricePerPortion = pricePerPortion;
    }
}
