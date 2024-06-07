package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Role(Role.Type.EVENT)
public class MoneyDeposit extends Event{
    private double amount;

    public MoneyDeposit(LocalDateTime timestamp,
                        Shelter shelter,
                        double amount) {
        super(timestamp, shelter);
        this.amount = amount;
    }

    public MoneyDeposit(long timestampLong,
                        Shelter shelter,
                        double amount) {
        super(LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampLong), ZoneId.systemDefault()), shelter);
        this.amount = amount;
    }


    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "MoneyDeposit{" +
                "amount=" + amount +
                '}';
    }
}
