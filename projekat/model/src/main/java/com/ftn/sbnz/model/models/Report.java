package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.ReportType;

import java.time.LocalDateTime;

public class Report {

    private ReportType type;
    private int adoptionCount;
    private int shelteringCount;
    private LocalDateTime fromDate;
    private LocalDateTime toDate;
    private Shelter shelter;


    public Report(ReportType type,
                  int adoptionCount,
                  int shelteringCount,
                  LocalDateTime fromDate,
                  LocalDateTime toDate,
                  Shelter shelter) {
        this.type = type;
        this.adoptionCount = adoptionCount;
        this.shelteringCount = shelteringCount;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.shelter = shelter;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
    }

    public int getAdoptionCount() {
        return adoptionCount;
    }

    public void setAdoptionCount(int adoptionCount) {
        this.adoptionCount = adoptionCount;
    }

    public int getShelteringCount() {
        return shelteringCount;
    }

    public void setShelteringCount(int shelteringCount) {
        this.shelteringCount = shelteringCount;
    }

    public LocalDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDateTime getToDate() {
        return toDate;
    }

    public void setToDate(LocalDateTime toDate) {
        this.toDate = toDate;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }
}
