package com.ftn.sbnz.model.models.backModels;
import java.util.List;

public class Questionnaire {
    public List<Question> getQuestions() {
        return questions;
    }

    private final List<Question> questions;

    public Questionnaire(List<Question> questions) {
        this.questions = questions;
    }
}
