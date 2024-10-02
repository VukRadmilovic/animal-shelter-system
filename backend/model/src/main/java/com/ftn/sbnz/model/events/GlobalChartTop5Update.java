package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.models.GlobalRecommendation;

import java.util.ArrayList;
import java.util.List;

public class GlobalChartTop5Update {

    private List<GlobalRecommendation> newAnimalsInTop5;

    public List<GlobalRecommendation> getNewGlobalChart() {
        return newGlobalChart;
    }

    public void setNewGlobalChart(List<GlobalRecommendation> newGlobalChart) {
        this.newGlobalChart = newGlobalChart;
    }

    private List<GlobalRecommendation> newGlobalChart;

    public GlobalChartTop5Update(List<GlobalRecommendation> top5, List<GlobalRecommendation> newGlobalChart) {
        this.newAnimalsInTop5 = top5;
        this.newGlobalChart = newGlobalChart;
    }

    public List<GlobalRecommendation> getNewAnimalsInTop5() {
        return newAnimalsInTop5;
    }

    public void setNewAnimalsInTop5(List<GlobalRecommendation> newAnimalsInTop5) {
        this.newAnimalsInTop5 = newAnimalsInTop5;
    }

    public List<AnimalBreed> getNewAnimalBreeds() {
        List<AnimalBreed> breeds = new ArrayList<>();
        for(GlobalRecommendation recommendation : newAnimalsInTop5){
            breeds.add(recommendation.getAnimalBreed());
        }
        return  breeds;
    }
}
