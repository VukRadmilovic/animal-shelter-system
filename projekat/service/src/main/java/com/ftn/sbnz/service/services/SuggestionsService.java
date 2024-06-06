package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.events.QuestionnaireFilled;
import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.RecommendationsMap;
import com.ftn.sbnz.model.models.Response;
import com.ftn.sbnz.model.models.backModels.*;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class SuggestionsService {

    private final KieSession kieSession;

    @Autowired
    public SuggestionsService(KieSession kieSession) {
        this.kieSession = kieSession;
    }

    public void submitResponse(Response response) {
        kieSession.insert(response);
        if(response.getQuestionId() == 15) {
            kieSession.insert(new QuestionnaireFilled(response.getUserId()));
        }
        kieSession.fireAllRules();
    }

    public Suggestions getSuggestions(Long userId) {
        QueryResults results = kieSession.getQueryResults("getFinalists");
        FinalistsForUsers map = null;
        for (QueryResultsRow row : results) {
            map = (FinalistsForUsers) row.get("$map");
        }
        Suggestions suggestions = new Suggestions(new ArrayList<>());
        for(AnimalBreed breed : map.getFinalists().get(userId)) {
            String lowered = breed.toString().toLowerCase().replace("_"," ");
            String pet = lowered.substring(0,1).toUpperCase() + lowered.substring(1);
            suggestions.getSuggestions().add(new Suggestion(pet, BreedsAndPictures.map.get(breed)));
        }
        return suggestions;
    }

    public Questionnaire getQuestions() {
        return new Questionnaire(QuestionsAndAnswers.questions);
    }
}
