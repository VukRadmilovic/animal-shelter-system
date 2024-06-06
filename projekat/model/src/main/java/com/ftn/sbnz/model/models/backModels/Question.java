package com.ftn.sbnz.model.models.backModels;
import java.util.List;

public class Question {
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

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    private int number;
    private String text;
    private List<Answer> answers;

    public Question(int number, String text, List<Answer> answers) {
        this.number = number;
        this.text = text;
        this.answers = answers;
    }
}
