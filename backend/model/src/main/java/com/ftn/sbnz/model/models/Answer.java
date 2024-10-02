package com.ftn.sbnz.model.models;

public class Answer {
    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    private int number;
    private String text;

    public Answer(int number, String text) {
        this.number = number;
        this.text = text;
    }
}
