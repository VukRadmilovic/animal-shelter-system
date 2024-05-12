package com.ftn.sbnz.model.models;

public class QuestionResponseWithRecommendation {

    private String ruleName;
    private int questionId;
    private int choice;
    private String recommendations;

    public QuestionResponseWithRecommendation(String ruleName,
                                              int questionId,
                                              int choice,
                                              String recommendations) {
        this.ruleName = ruleName;
        this.questionId = questionId;
        this.choice = choice;
        this.recommendations = recommendations;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
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

    public String getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }
}
