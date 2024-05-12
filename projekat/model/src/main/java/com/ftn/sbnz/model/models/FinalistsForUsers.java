package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FinalistsForUsers {
    public Map<Long, List<AnimalBreed>> getFinalists() {
        return finalists;
    }

    public void setFinalists(Map<Long, List<AnimalBreed>> finalists) {
        this.finalists = finalists;
    }

    private Map<Long, List<AnimalBreed>> finalists;

    public FinalistsForUsers() {
        this.finalists = new HashMap<>();
    }
}
