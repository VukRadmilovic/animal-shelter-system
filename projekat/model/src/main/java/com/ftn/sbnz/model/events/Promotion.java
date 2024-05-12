package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class Promotion extends Event{
    private PromotionOrResettlementType type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;

    public Promotion(LocalDateTime timestamp,
                     Shelter shelter,
                     PromotionOrResettlementType type,
                     LocalDateTime startDate,
                     LocalDateTime endDate,
                     boolean isActive) {
        super(timestamp, shelter);
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }


    public PromotionOrResettlementType getType() {
        return type;
    }

    public void setType(PromotionOrResettlementType type) {
        this.type = type;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
