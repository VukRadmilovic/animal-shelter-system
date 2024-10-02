package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;

import java.util.Objects;

public class AnimalWithName {

    private AnimalType animalType;
    private AnimalBreed animalBreed;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AnimalWithName(AnimalType animalType, AnimalBreed animalBreed, String name) {
        this.animalType = animalType;
        this.animalBreed = animalBreed;
        this.name = name;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnimalWithName animal = (AnimalWithName) o;
        return animalType == animal.animalType && animalBreed == animal.animalBreed && name.equals(animal.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(animalType, animalBreed, name);
    }

    @Override
    public String toString() {
        return "Animal{" +
                "animalType=" + animalType +
                ", animalBreed=" + animalBreed +
                ", name='" + name + '\'' +
                '}';
    }
}
