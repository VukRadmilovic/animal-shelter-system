package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.models.Shelter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public abstract class Event {

    public Event(LocalDateTime timestamp, Shelter shelter) {
        this.timestamp = timestamp;
        this.shelter = shelter;
    }

    public Event(long timestamp, Shelter shelter) {
        this(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault()), shelter);
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
