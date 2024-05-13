package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class Promotion extends Event{
    private PromotionOrResettlementType type;
    private LocalDateTime endDate;
    private boolean isActive;

    public Promotion(Shelter shelter,
                     PromotionOrResettlementType type,
                     LocalDateTime endDate) {
        super(LocalDateTime.now(), shelter);
        this.type = type;
        this.endDate = endDate;
        this.isActive = true;
    }


    public PromotionOrResettlementType getType() {
        return type;
    }

    public void setType(PromotionOrResettlementType type) {
        this.type = type;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }
}
