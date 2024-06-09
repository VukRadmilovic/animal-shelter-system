package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GlobalChart {
    private List<GlobalRecommendation> recommendations;

    public GlobalChart() {
        this.recommendations = new ArrayList<>();
        for (AnimalBreed breed : AnimalBreed.values()) {
            this.recommendations.add(new GlobalRecommendation(breed, 0));
        }
    }

    public List<GlobalRecommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<GlobalRecommendation> recommendations) {
        this.recommendations = recommendations;
    }

    public List<GlobalRecommendation> getTop5() {
        return this.recommendations.stream().limit(5).collect(Collectors.toList());
    }

    public List<GlobalRecommendation> getTop5Differences(List<GlobalRecommendation> updates) {
        List<GlobalRecommendation> differences = new ArrayList<>();
        for(GlobalRecommendation update : updates) {
            if (getTop5().stream().noneMatch(o -> o.getAnimalBreed().equals(update.getAnimalBreed()))) {
                differences.add(update);
            }
        }
        return differences;
    }
}
