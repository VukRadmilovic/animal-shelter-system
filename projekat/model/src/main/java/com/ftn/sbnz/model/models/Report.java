package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.ReportType;
import org.kie.api.definition.type.Position;

public class Report {
    @Position(0)
    private String name;
    @Position(1)
    private String parent;
    private ReportType type;
    private int adoptionCount;
    private int shelteringCount;
    private Shelter shelter;

    public Report() {
    }

    public Report(String name, String parent, ReportType type, int adoptionCount, int shelteringCount, Shelter shelter) {
        this.name = name;
        this.parent = parent;
        this.type = type;
        this.adoptionCount = adoptionCount;
        this.shelteringCount = shelteringCount;
        this.shelter = shelter;
    }

    public Report(String name, String parent, ReportType type, Shelter shelter) {
        this.name = name;
        this.parent = parent;
        this.type = type;
        this.shelter = shelter;
        this.adoptionCount = 0;
        this.shelteringCount = 0;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
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

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }

    public void incrementAdoptionCount() {
        this.adoptionCount++;
    }

    public void incrementShelteringCount() {
        this.shelteringCount++;
    }

    public void incrementAdoptionCount(int count) {
        this.adoptionCount += count;
    }

    public void incrementShelteringCount(int count) {
        this.shelteringCount += count;
    }

    @Override
    public String toString() {
        return "Report{" +
                "name='" + name + '\'' +
                ", parent='" + parent + '\'' +
                ", type=" + type +
                ", adoptionCount=" + adoptionCount +
                ", shelteringCount=" + shelteringCount +
                ", shelter=" + shelter +
                '}';
    }
}
