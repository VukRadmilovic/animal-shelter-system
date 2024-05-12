package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.AnimalBreed;

import java.util.List;

public class Idk {
    private int questionId;
    private int choice;
    private List<AnimalBreed> recommendation;

    public Idk(int questionId, int choice, List<AnimalBreed> recommendation) {
        this.questionId = questionId;
        this.choice = choice;
        this.recommendation = recommendation;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public int getChoice() {
        return choice;
    }

    public void setChoice(int choice) {
        this.choice = choice;
    }

    public List<AnimalBreed> getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(List<AnimalBreed> recommendation) {
        this.recommendation = recommendation;
    }
}
