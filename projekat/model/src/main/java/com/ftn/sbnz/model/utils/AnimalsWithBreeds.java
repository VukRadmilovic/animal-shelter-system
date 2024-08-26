package com.ftn.sbnz.model.utils;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;
import com.ftn.sbnz.model.models.Animal;

import java.util.Arrays;
import java.util.List;

public class AnimalsWithBreeds {

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }

    private List<Animal> animals;
    public static List<Animal> animalsWithBreeds = Arrays.asList(
            new Animal(AnimalType.DOG, AnimalBreed.GERMAN_SHEPHERD),
            new Animal(AnimalType.DOG, AnimalBreed.GOLDEN_RETRIEVER),
            new Animal(AnimalType.DOG, AnimalBreed.BULLDOG),
            new Animal(AnimalType.DOG, AnimalBreed.POODLE),
            new Animal(AnimalType.DOG, AnimalBreed.BEAGLE),
            new Animal(AnimalType.DOG, AnimalBreed.CHIHUAHUA),
            new Animal(AnimalType.DOG, AnimalBreed.ROTTWEILER),
            new Animal(AnimalType.DOG, AnimalBreed.DALMATIAN),
            new Animal(AnimalType.DOG, AnimalBreed.LABRADOR_RETRIEVER),
            new Animal(AnimalType.DOG, AnimalBreed.PUG),
            new Animal(AnimalType.DOG, AnimalBreed.HUSKY),
            new Animal(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT),
            new Animal(AnimalType.CAT, AnimalBreed.SIAMESE_CAT),
            new Animal(AnimalType.CAT, AnimalBreed.SPHYNX),
            new Animal(AnimalType.CAT, AnimalBreed.PERSIAN_CAT),
            new Animal(AnimalType.CAT, AnimalBreed.BRITISH_SHORTHAIR_CAT),
            new Animal(AnimalType.BIRD, AnimalBreed.CANARY),
            new Animal(AnimalType.BIRD, AnimalBreed.PIGEON),
            new Animal(AnimalType.BIRD, AnimalBreed.AFRICAN_GRAY_PARROT),
            new Animal(AnimalType.BIRD, AnimalBreed.BUDGERIGAR),
            new Animal(AnimalType.BIRD, AnimalBreed.COCKATIEL),
            new Animal(AnimalType.REPTILE, AnimalBreed.TURTLE),
            new Animal(AnimalType.REPTILE, AnimalBreed.GECKO),
            new Animal(AnimalType.REPTILE, AnimalBreed.BALL_PYTHON),
            new Animal(AnimalType.REPTILE, AnimalBreed.BEARDED_DRAGON),
            new Animal(AnimalType.RODENT, AnimalBreed.GUINEA_PIG),
            new Animal(AnimalType.RODENT, AnimalBreed.HAMSTER),
            new Animal(AnimalType.SPIDER, AnimalBreed.TARANTULA),
            new Animal(AnimalType.FISH, AnimalBreed.BIG_FISH),
            new Animal(AnimalType.FISH, AnimalBreed.SMALL_FISH),
            new Animal(AnimalType.RABBIT, AnimalBreed.BUNNY),
            new Animal(AnimalType.RABBIT, AnimalBreed.DUTCH_DWARF_RABBIT),
            new Animal(AnimalType.RABBIT, AnimalBreed.LIONHEAD)
    );

    public AnimalsWithBreeds() {
        this.animals = animalsWithBreeds;
    }
}
