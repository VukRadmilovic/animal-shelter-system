package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.models.Shelter;

import java.time.LocalDateTime;

public abstract class Event {

    public Event(LocalDateTime timestamp, Shelter shelter) {
        this.timestamp = timestamp;
        this.shelter = shelter;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    private LocalDateTime timestamp;

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }

    private Shelter shelter;
}
