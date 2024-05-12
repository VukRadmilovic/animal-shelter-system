package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.AnimalType;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class FoodPurchase extends Event{
    private AnimalType animalType;
    private double quantity;

    public FoodPurchase(LocalDateTime timestamp,
                        Shelter shelter,
                        AnimalType animalType,
                        double quantity) {
        super(timestamp, shelter);
        this.animalType = animalType;
        this.quantity = quantity;
    }


    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}
