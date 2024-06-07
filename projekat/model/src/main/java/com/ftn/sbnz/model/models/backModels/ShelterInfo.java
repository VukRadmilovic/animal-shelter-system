package com.ftn.sbnz.model.models.backModels;

import com.ftn.sbnz.model.models.Animal;
import com.ftn.sbnz.model.models.FoodAvailableForAnimal;
import com.ftn.sbnz.model.models.Price;

import java.util.List;

public class ShelterInfo {
    private String name;
    private String address;
    private int capacity;
    private double moneyAvailable;
    private List<Animal> animals;
    private List<Price> prices;

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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getMoneyAvailable() {
        return moneyAvailable;
    }

    public void setMoneyAvailable(double moneyAvailable) {
        this.moneyAvailable = moneyAvailable;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
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

    public ShelterInfo(String name, String address, int capacity, double moneyAvailable, List<Animal> animals, List<Price> prices, List<FoodAvailableForAnimal> foodAvailableForAnimals) {
        this.name = name;
        this.address = address;
        this.capacity = capacity;
        this.moneyAvailable = moneyAvailable;
        this.animals = animals;
        this.prices = prices;
        this.foodAvailableForAnimals = foodAvailableForAnimals;
    }
}
