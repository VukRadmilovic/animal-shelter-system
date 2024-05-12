package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

public class RecommendationNumber {
    private AnimalBreed breed;
    private int recommendationCount;

    public RecommendationNumber(AnimalBreed breed, int recommendationCount) {
        this.breed = breed;
        this.recommendationCount = recommendationCount;
    }

    public AnimalBreed getBreed() {
        return breed;
    }

    public void setBreed(AnimalBreed breed) {
        this.breed = breed;
    }

    public int getRecommendationCount() {
        return recommendationCount;
    }

    public void setRecommendationCount(int recommendationCount) {
        this.recommendationCount = recommendationCount;
    }
}
