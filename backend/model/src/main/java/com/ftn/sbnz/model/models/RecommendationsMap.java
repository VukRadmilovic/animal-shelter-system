package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.HashMap;
import java.util.Map;

public class RecommendationsMap {
    public Map<Long, Map<AnimalBreed, Integer>> getMap() {
        return map;
    }

    public void setMap(Map<Long, Map<AnimalBreed, Integer>> map) {
        this.map = map;
    }

    private Map<Long, Map<AnimalBreed,Integer>> map;


    public RecommendationsMap() {
        this.map = new HashMap<>();
    }
}
