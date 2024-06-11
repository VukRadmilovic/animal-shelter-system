package com.ftn.sbnz.model.models.backModels;

public class ReportDTO {
    private int adoptionCount;
    private int shelteredCount;

    public ReportDTO() {
    }

    public ReportDTO(int adoptionCount, int shelteredCount) {
        this.adoptionCount = adoptionCount;
        this.shelteredCount = shelteredCount;
    }

    public int getAdoptionCount() {
        return adoptionCount;
    }

    public void setAdoptionCount(int adoptionCount) {
        this.adoptionCount = adoptionCount;
    }

    public int getShelteredCount() {
        return shelteredCount;
    }

    public void setShelteredCount(int shelteredCount) {
        this.shelteredCount = shelteredCount;
    }
}
