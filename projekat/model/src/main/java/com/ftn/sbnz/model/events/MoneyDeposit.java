package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class MoneyDeposit extends Event{
    private double amount;

    public MoneyDeposit(LocalDateTime timestamp,
                        Shelter shelter,
                        double amount) {
        super(timestamp, shelter);
        this.amount = amount;
    }


    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
