package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.models.Animal;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Role(Role.Type.EVENT)
public class Resettlement extends Event {
    private PromotionOrResettlementType resettlementType;
    private Animal animal;


    public Resettlement(LocalDateTime timestamp,
                        Shelter shelter,
                        PromotionOrResettlementType resettlementType,
                        Animal animal) {
        super(timestamp, shelter);
        this.resettlementType = resettlementType;
        this.animal = animal;
    }

    public Resettlement(long timestampLong,
                        Shelter shelter,
                        PromotionOrResettlementType resettlementType,
                        Animal animal) {
        super(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampLong), ZoneId.systemDefault()), shelter);
        this.resettlementType = resettlementType;
        this.animal = animal;
    }

    public PromotionOrResettlementType getResettlementType() {
        return resettlementType;
    }

    public void setResettlementType(PromotionOrResettlementType resettlementType) {
        this.resettlementType = resettlementType;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public String getReportName() {
        return super.getTimestamp().getDayOfMonth() + "." + super.getTimestamp().getMonthValue() + "." + super.getTimestamp().getYear() + ".";
    }

    @Override
    public String toString() {
        return "Resettlement{" +
                "resettlementType=" + resettlementType +
                ", animal=" + animal +
                '}';
    }
}
