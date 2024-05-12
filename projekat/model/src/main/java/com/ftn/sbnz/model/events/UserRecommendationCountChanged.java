package com.ftn.sbnz.model.events;

public class UserRecommendationCountChanged {
    private Long userId;

    public UserRecommendationCountChanged(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
