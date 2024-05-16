package com.ftn.sbnz.model.models;

public class Response {
    private Long userId;
    private int questionId;
    private double choice;

    public Response(Long userId,
                    int questionId,
                    double choice) {
        this.userId = userId;
        this.questionId = questionId;
        this.choice = choice;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public double getChoice() {
        return choice;
    }

    public void setChoice(double choice) {
        this.choice = choice;
    }
}
