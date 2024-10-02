package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.AnimalType;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Role(Role.Type.EVENT)
public class FoodPurchase extends Event{
    private AnimalType animalType;
    private int quantity;

    public FoodPurchase(LocalDateTime timestamp,
                        Shelter shelter,
                        AnimalType animalType,
                        int quantity) {
        super(timestamp, shelter);
        this.animalType = animalType;
        this.quantity = quantity;
    }

    public FoodPurchase(long timestampLong,
                        Shelter shelter,
                        AnimalType animalType,
                        int quantity) {
        super(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampLong), ZoneId.systemDefault()), shelter);
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
}
