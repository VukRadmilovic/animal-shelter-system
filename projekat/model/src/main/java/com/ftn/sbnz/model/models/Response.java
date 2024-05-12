package com.ftn.sbnz.model.models;

public class Response {
    private Long userId;
    private int questionId;
    private int choice;

    public Response(Long userId,
                    int questionId,
                    int choice) {
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

    public int getChoice() {
        return choice;
    }

    public void setChoice(int choice) {
        this.choice = choice;
    }
}
