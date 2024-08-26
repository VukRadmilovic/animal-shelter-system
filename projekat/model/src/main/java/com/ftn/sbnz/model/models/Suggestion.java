package com.ftn.sbnz.model.models;

public class Suggestion {
    private String pet;
    private String picture;

    public Suggestion(String pet, String picture) {
        this.pet = pet;
        this.picture = picture;
    }

    public String getPet() {
        return pet;
    }

    public void setPet(String pet) {
        this.pet = pet;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
