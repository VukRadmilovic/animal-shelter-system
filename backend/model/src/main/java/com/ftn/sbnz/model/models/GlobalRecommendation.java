package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

public class GlobalRecommendation {
    private AnimalBreed animalBreed;
    private int recommendationCount;

    public GlobalRecommendation(AnimalBreed animalBreed, int recommendationCount) {
        this.animalBreed = animalBreed;
        this.recommendationCount = recommendationCount;
    }

    public AnimalBreed getAnimalBreed() {
        return animalBreed;
    }

    public void setAnimalBreed(AnimalBreed animalBreed) {
        this.animalBreed = animalBreed;
    }

    public int getRecommendationCount() {
        return recommendationCount;
    }

    public void setRecommendationCount(int recommendationCount) {
        this.recommendationCount = recommendationCount;
    }

    @Override
    public GlobalRecommendation clone() throws CloneNotSupportedException {
        return new GlobalRecommendation(this.animalBreed,this.recommendationCount);
    }

    @Override
    public String toString() {
        return this.animalBreed + ":" + this.recommendationCount;
    }


}
