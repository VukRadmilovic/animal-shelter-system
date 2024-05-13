package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.models.Animal;
import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class Resettlement extends Event {

    public Resettlement(LocalDateTime timestamp,
                        Shelter shelter,
                        PromotionOrResettlementType resettlementType,
                        Animal animal) {
        super(timestamp, shelter);
        this.resettlementType = resettlementType;
        this.animal = animal;
    }

    public PromotionOrResettlementType getResettlementType() {
        return resettlementType;
    }

    public void setResettlementType(PromotionOrResettlementType resettlementType) {
        this.resettlementType = resettlementType;
    }

    private PromotionOrResettlementType resettlementType;

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    private Animal animal;
}
