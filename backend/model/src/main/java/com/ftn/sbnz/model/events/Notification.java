package com.ftn.sbnz.model.events;

import com.ftn.sbnz.model.models.Shelter;
import org.kie.api.definition.type.Role;

import java.time.LocalDateTime;

@Role(Role.Type.EVENT)
public class Notification extends Event{

    private String text;
    private boolean isRead;

    public Notification(LocalDateTime timestamp,
                        Shelter shelter,
                        String text) {
        super(timestamp, shelter);
        this.text = text;
        this.isRead = false;
    }

    public Notification(long timestampLong,
                        Shelter shelter,
                        String text) {
        super(timestampLong, shelter);
        this.text = text;
        this.isRead = false;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "text='" + text + '\'' +
                ", isRead=" + isRead +
                '}';
    }
}
