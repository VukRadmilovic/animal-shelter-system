package com.ftn.sbnz.model.models.backModels;

import com.ftn.sbnz.model.enums.AnimalType;

public class FoodPurchaseDTO {
    private AnimalType animalType;
    private int quantity;

    public FoodPurchaseDTO() {
    }

    public FoodPurchaseDTO(AnimalType animalType, int quantity) {
        this.animalType = animalType;
        this.quantity = quantity;
    }

    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "FoodPurchaseDTO{" +
                "animalType=" + animalType +
                ", quantity=" + quantity +
                '}';
    }
}
