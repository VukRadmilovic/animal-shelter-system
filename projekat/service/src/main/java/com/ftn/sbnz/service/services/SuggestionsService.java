package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.events.Event;
import com.ftn.sbnz.model.events.Notification;
import com.ftn.sbnz.model.events.Promotion;
import com.ftn.sbnz.model.events.QuestionnaireFilled;
import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.GlobalChart;
import com.ftn.sbnz.model.models.RecommendationsMap;
import com.ftn.sbnz.model.models.Response;
import com.ftn.sbnz.model.models.backModels.*;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.kie.api.time.SessionPseudoClock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
public class SuggestionsService {
    private final KieSession kieSession;

    private void advanceTime() {
//        SessionPseudoClock clock = kieSession.getSessionClock();
//        clock.advanceTime(1, java.util.concurrent.TimeUnit.SECONDS);
    }

    @Autowired
    public SuggestionsService(KieSession kieSession) {
        this.kieSession = kieSession;
    }

    public void submitResponse(Response response) {
        advanceTime();
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

    public GlobalChart getGlobalChart() {
        QueryResults results = kieSession.getQueryResults("getGlobalChart");
        GlobalChart chart = null;
        for (QueryResultsRow row : results) {
            chart = (GlobalChart) row.get("$globalChart");
        }
        return chart;
    }
}
