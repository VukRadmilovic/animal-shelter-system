package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Shelter {
    private String name;
    private String address;
    private double moneyAvailable;
    private double moneyNeededForUpkeep;
    private int capacity;
    private List<AnimalWithName> animals;
    private Map<AnimalType, Double> prices;
    private Map<AnimalType, Integer> foodAvailableForAnimals;

    public Shelter(String name,
                   String address,
                   double moneyAvailable,
                   int capacity,
                   List<AnimalWithName> animals,
                   List<FoodAvailableForAnimal> foodAvailableForAnimals,
                   List<Price> prices) {
        this.name = name;
        this.address = address;
        this.moneyAvailable = moneyAvailable;
        this.capacity = capacity;
        this.animals = animals;
        this.foodAvailableForAnimals = new HashMap<>();
        for (FoodAvailableForAnimal foodAvailableForAnimal: foodAvailableForAnimals) {
            this.foodAvailableForAnimals.put(foodAvailableForAnimal.getAnimalType(), foodAvailableForAnimal.getPortionCount());
        }
        this.prices = new HashMap<>();
        for (Price price: prices) {
            this.prices.put(price.getAnimalType(), price.getPricePerPortion());
        }
    }

    public Shelter(String name,
                   String address,
                   double moneyAvailable,
                   int capacity,
                   List<AnimalWithName> animals,
                   Map<AnimalType, Integer> foodAvailableForAnimals,
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
        for (AnimalWithName animal: animals) {
            sum += 9 * prices.get(animal.getAnimalType());
        }
        return sum;
    }

    public Map<AnimalType, Integer> getFoodAvailableForAnimals() {
        return foodAvailableForAnimals;
    }

    public void setFoodAvailableForAnimals(Map<AnimalType, Integer> foodAvailableForAnimals) {
        this.foodAvailableForAnimals = foodAvailableForAnimals;
    }

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

    public List<AnimalWithName> getAnimals() {
        return animals;
    }

    public void setAnimals(List<AnimalWithName> animals) {
        this.animals = animals;
    }

    public void addAnimal(AnimalWithName animal) {
        this.animals.add(animal);
    }

    public void removeAnimal(AnimalWithName animal) {
        this.animals.remove(animal);
    }
}
