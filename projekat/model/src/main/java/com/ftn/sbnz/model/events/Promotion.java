package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Role(Role.Type.EVENT)
public class Promotion extends Event{
    private PromotionOrResettlementType type;
    private LocalDateTime endDate;
    private boolean isActive;

    public Promotion(LocalDateTime timestamp,
                        Shelter shelter,
                     PromotionOrResettlementType type,
                     LocalDateTime endDate) {
        super(timestamp, shelter);
        this.type = type;
        this.endDate = endDate;
        this.isActive = true;
    }

    public Promotion(LocalDateTime timestamp,
                    Shelter shelter,
                    PromotionOrResettlementType type) {
        super(timestamp, shelter);
        this.type = type;
        this.endDate = null;
        this.isActive = true;
    }

    public Promotion(long timestampLong,
                    Shelter shelter,
                    PromotionOrResettlementType type,
                    long endDateLong) {
        super(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampLong), ZoneId.systemDefault()), shelter);
        this.type = type;
        this.endDate = LocalDateTime.ofInstant(Instant.ofEpochMilli(endDateLong), ZoneId.systemDefault());
        this.isActive = true;
    }

    public Promotion(long timestampLong,
                    Shelter shelter,
                    PromotionOrResettlementType type) {
        super(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampLong), ZoneId.systemDefault()), shelter);
        this.type = type;
        this.endDate = null;
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

    public void setEndDate(long endDateLong) {
        this.endDate = LocalDateTime.ofInstant(Instant.ofEpochMilli(endDateLong), ZoneId.systemDefault());
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "Promotion{" +
                "type=" + type +
                ", timestamp=" + super.getTimestamp() +
                ", endDate=" + endDate +
                ", isActive=" + isActive +
                '}';
    }
}
