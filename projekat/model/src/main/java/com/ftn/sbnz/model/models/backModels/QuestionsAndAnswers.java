package com.ftn.sbnz.model.models.backModels;


import java.util.Arrays;
import java.util.List;

public class QuestionsAndAnswers {

    public static List<Question> questions = Arrays.asList(
        new Question(1,"Do you live with kids?",
                Arrays.asList(new Answer(1, "Yes, I do."), new Answer(2, "No, I don't."))),
        new Question(2,"Do you live in an apartment or a house?",
                Arrays.asList(new Answer(1, "I live in an apartment."), new Answer(2, "I live in a house."))),
        new Question(3,"Do you have access to a yard?",
                Arrays.asList(new Answer(1, "Yes, I do."), new Answer(2, "No, I don't."))),
        new Question(4,"How active are you?",
                Arrays.asList(new Answer(1, "I am very active."), new Answer(2, "I am active."), new Answer(3, "I am not very active."))),
        new Question(5,"Do you live in a city or a town/village?",
                Arrays.asList(new Answer(1, "I live in a city."), new Answer(2, "I live in a town/village."))),
        new Question(6,"Do you have any other pets?",
                Arrays.asList(new Answer(1, "Yes, I do."), new Answer(2, "No, I don't."))),
        new Question(7,"Do you have any pet-related allergies?",
                Arrays.asList(new Answer(1, "No, I don't."), new Answer(2, "Yes, I have a feather allergy."),
                        new Answer(3, "Yes, I have a hair allergy."),
                        new Answer(4, "Yes, I have both feather and hair allergies."))),
        new Question(8,"How active would you like your pet to be?",
                Arrays.asList(new Answer(1, "I want a more active pet."), new Answer(2, "I want a less active pet."))),
        new Question(9,"How sociable would you like your pet to be?",
                Arrays.asList(new Answer(1, "I want a more sociable pet."), new Answer(2, "I want a more solitary pet."))),
        new Question(10,"Do you mind the noise?",
                Arrays.asList(new Answer(1, "Yes, I do."), new Answer(2, "No, I don't."))),
        new Question(11,"How many people do you live with?", null),
        new Question(12,"How big is your living space (in square meters)?", null),
        new Question(13,"How much money are you willing to spend on your pet on a monthly basis (in dinars)?", null),
        new Question(14,"How many hours a day are you out of your home?", null),
        new Question(15,"How many hours a day are you willing to spend with your pet?", null)
    );
}
