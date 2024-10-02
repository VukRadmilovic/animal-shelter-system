package com.ftn.sbnz.model.events;

public class FinalistsChangedForUser {
    private Long userId;

    public FinalistsChangedForUser(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
