package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.events.Event;
import com.ftn.sbnz.model.events.MoneyDeposit;
import com.ftn.sbnz.model.events.Notification;
import com.ftn.sbnz.model.events.Promotion;
import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.Shelter;
import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import com.ftn.sbnz.model.models.backModels.ShelterInfo;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.kie.api.time.SessionClock;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class ShelterService {

    public ShelterService(KieSession kieSession) {
        this.kieSession = kieSession;
    }

    private final KieSession kieSession;

    public AnimalsWithBreeds getAnimalsWithBreeds() {
        return new AnimalsWithBreeds();
    }

    public void registerShelter(ShelterInfo shelterInfo) {
        Shelter shelter = new Shelter(shelterInfo.getName(),
                shelterInfo.getAddress(),
                shelterInfo.getMoneyAvailable(),
                shelterInfo.getCapacity(),
                shelterInfo.getAnimals(),
                shelterInfo.getFoodAvailableForAnimals(),
                shelterInfo.getPrices());
        kieSession.insert(shelter);
    }

    public boolean checkIfShelterExists() {
        QueryResults results = kieSession.getQueryResults("checkShelter");
        return results.size() != 0;
    }

    private ArrayList<Notification> getNotifications() {
        QueryResults results = kieSession.getQueryResults("getNotifications");
        ArrayList<Notification> notifications = new ArrayList<>();
        System.out.println("Notifications: " + results.size());
        for (QueryResultsRow row : results) {
            notifications = (ArrayList<Notification>) row.get("$notifications");
        }
        return notifications;
    }

    public List<Notification> getNotificationsAndPromotions() {
        ArrayList<Notification> notifications = getNotifications();
        notifications.sort(Comparator.comparing(Event::getTimestamp));

        QueryResults results = kieSession.getQueryResults("getPromotions");
        ArrayList<Promotion> promotions = new ArrayList<>();
        System.out.println("Promotions: " + results.size());
        for (QueryResultsRow row : results) {
            promotions = (ArrayList<Promotion>) row.get("$promotions");
        }

        for (Promotion promotion: promotions) {
            Notification notification = new Notification(promotion.getTimestamp(), promotion.getShelter(),
                    String.format("Promotion: %s until %s", promotion.getType(), promotion.getEndDate()));
            notifications.add(0, notification);
        }
        return notifications;
    }

    public Shelter getShelter() {
        QueryResults results = kieSession.getQueryResults("checkShelter");
        for (QueryResultsRow row : results) {
            return (Shelter) row.get("$shelter");
        }
        return null;
    }

    public SessionClock getSessionClock() {
        return kieSession.getSessionClock();
    }

    public void depositMoney(double amount) {
        Shelter shelter = getShelter();
        MoneyDeposit moneyDeposit = new MoneyDeposit(getSessionClock().getCurrentTime(), shelter, amount);
        kieSession.insert(moneyDeposit);
        kieSession.fireAllRules();
    }
}
