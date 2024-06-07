package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Shelter {
    private String name;
    private String address;
    private double moneyAvailable;
    private double moneyNeededForUpkeep;
    private int capacity;
    private List<Animal> animals;
    private Map<AnimalType, Double> prices;

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
        this.prices = new HashMap<>();
        for (Price price: prices) {
            this.prices.put(price.getAnimalType(), price.getPricePerPortion());
        }
    }

    public Shelter(String name,
                   String address,
                   double moneyAvailable,
                   int capacity,
                   List<Animal> animals,
                   List<FoodAvailableForAnimal> foodAvailableForAnimals,
                   Map<AnimalType, Double> prices) {
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

    public Map<AnimalType, Double> getPrices() {
        return prices;
    }

    public void setPrices(Map<AnimalType, Double> prices) {
        this.prices = prices;
    }

    public double calculateMoneyNeededForUpkeep() {
        double sum = 0;
        for (Animal animal: animals) {
            sum += 9 * prices.get(animal.getAnimalType());
        }
        return sum;
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

    public void removeAnimal(Animal animal) {
        this.animals.remove(animal);
    }
}
