package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.ArrayList;
import java.util.List;

public class Shelter {
    private String name;
    private String address;
    private double moneyAvailable;
    private double moneyNeededForUpkeep;
    private int capacity;
    private List<Animal> animals;
    private List<Price> prices;

    public Shelter(String name,
                   String address,
                   double moneyAvailable,
                   int capacity,
                   List<Animal> animals,
                   List<FoodAvailableForAnimal> foodAvailableForAnimals,
                   List<Price> prices) {
        this.name = name;
        this.address = address;
        this.moneyAvailable = moneyAvailable;
        this.capacity = capacity;
        this.animals = animals;
        this.foodAvailableForAnimals = foodAvailableForAnimals;
        this.prices = prices;
    }

    public double getMoneyNeededForUpkeep() {
        return moneyNeededForUpkeep;
    }

    public void setMoneyNeededForUpkeep(double moneyNeededForUpkeep) {
        this.moneyNeededForUpkeep = moneyNeededForUpkeep;
    }

    public List<Price> getPrices() {
        return prices;
    }

    public void setPrices(List<Price> prices) {
        this.prices = prices;
    }

    public List<FoodAvailableForAnimal> getFoodAvailableForAnimals() {
        return foodAvailableForAnimals;
    }

    public void setFoodAvailableForAnimals(List<FoodAvailableForAnimal> foodAvailableForAnimals) {
        this.foodAvailableForAnimals = foodAvailableForAnimals;
    }

    private List<FoodAvailableForAnimal> foodAvailableForAnimals;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMoneyAvailable() {
        return moneyAvailable;
    }

    public void setMoneyAvailable(double moneyAvailable) {
        this.moneyAvailable = moneyAvailable;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }

    public void addAnimal(Animal animal) {
        this.animals.add(animal);
    }

}
