package com.ftn.sbnz.model.models.backModels;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;

import java.util.Arrays;
import java.util.List;

public class AnimalsWithBreeds {

    public List<AnimalWithBreed> getAnimals() {
        return animals;
    }

    public void setAnimals(List<AnimalWithBreed> animals) {
        this.animals = animals;
    }

    private List<AnimalWithBreed> animals;
    public static List<AnimalWithBreed> animalsWithBreeds = Arrays.asList(
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.GERMAN_SHEPHERD),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.GOLDEN_RETRIEVER),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.BULLDOG),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.POODLE),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.BEAGLE),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.CHIHUAHUA),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.ROTTWEILER),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.DALMATIAN),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.LABRADOR_RETRIEVER),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.PUG),
            new AnimalWithBreed(AnimalType.DOG, AnimalBreed.HUSKY),
            new AnimalWithBreed(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT),
            new AnimalWithBreed(AnimalType.CAT, AnimalBreed.SIAMESE_CAT),
            new AnimalWithBreed(AnimalType.CAT, AnimalBreed.SPHYNX),
            new AnimalWithBreed(AnimalType.CAT, AnimalBreed.PERSIAN_CAT),
            new AnimalWithBreed(AnimalType.CAT, AnimalBreed.BRITISH_SHORTHAIR_CAT),
            new AnimalWithBreed(AnimalType.BIRD, AnimalBreed.CANARY),
            new AnimalWithBreed(AnimalType.BIRD, AnimalBreed.PIGEON),
            new AnimalWithBreed(AnimalType.BIRD, AnimalBreed.AFRICAN_GRAY_PARROT),
            new AnimalWithBreed(AnimalType.BIRD, AnimalBreed.BUDGERIGAR),
            new AnimalWithBreed(AnimalType.BIRD, AnimalBreed.COCKATIEL),
            new AnimalWithBreed(AnimalType.REPTILE, AnimalBreed.TURTLE),
            new AnimalWithBreed(AnimalType.REPTILE, AnimalBreed.GECKO),
            new AnimalWithBreed(AnimalType.REPTILE, AnimalBreed.BALL_PYTHON),
            new AnimalWithBreed(AnimalType.REPTILE, AnimalBreed.BEARDED_DRAGON),
            new AnimalWithBreed(AnimalType.RODENT, AnimalBreed.GUINEA_PIG),
            new AnimalWithBreed(AnimalType.RODENT, AnimalBreed.HAMSTER),
            new AnimalWithBreed(AnimalType.SPIDER, AnimalBreed.TARANTULA),
            new AnimalWithBreed(AnimalType.FISH, AnimalBreed.BIG_FISH),
            new AnimalWithBreed(AnimalType.FISH, AnimalBreed.SMALL_FISH),
            new AnimalWithBreed(AnimalType.RABBIT, AnimalBreed.BUNNY),
            new AnimalWithBreed(AnimalType.RABBIT, AnimalBreed.DUTCH_DWARF_RABBIT),
            new AnimalWithBreed(AnimalType.RABBIT, AnimalBreed.LIONHEAD)
    );

    public AnimalsWithBreeds() {
        this.animals = animalsWithBreeds;
    }
}
