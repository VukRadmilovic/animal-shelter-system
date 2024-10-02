package com.ftn.sbnz.model.events;

public class QuestionnaireFilled {
    private Long userId;


    public QuestionnaireFilled(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

