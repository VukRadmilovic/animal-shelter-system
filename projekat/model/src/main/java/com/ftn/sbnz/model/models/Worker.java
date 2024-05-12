package com.ftn.sbnz.model.models;

public class Worker {
    private String username;
    private String password;
    private Shelter shelter;

    public Worker(String username, String password, Shelter shelter) {
        this.username = username;
        this.password = password;
        this.shelter = shelter;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }
}
