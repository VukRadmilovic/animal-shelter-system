package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.events.*;
import com.ftn.sbnz.model.models.Animal;
import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.Shelter;
import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import com.ftn.sbnz.model.models.backModels.ShelterInfo;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.kie.api.time.SessionClock;
import org.kie.api.time.SessionPseudoClock;
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

    private void advanceTime() {
        SessionPseudoClock clock = kieSession.getSessionClock();
        clock.advanceTime(1, java.util.concurrent.TimeUnit.SECONDS);
    }

    public void registerShelter(ShelterInfo shelterInfo) {
        advanceTime();
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
        advanceTime();
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
        advanceTime();
        ArrayList<Notification> notifications = getNotifications();
        notifications.sort(Comparator.comparing(Event::getTimestamp).reversed());

        QueryResults results = kieSession.getQueryResults("getPromotions");
        ArrayList<Promotion> promotions = new ArrayList<>();
        System.out.println("Promotions: " + results.size());
        for (QueryResultsRow row : results) {
            promotions = (ArrayList<Promotion>) row.get("$promotions");
        }

        for (Promotion promotion: promotions) {
            Notification notification = new Notification(promotion.getTimestamp(), promotion.getShelter(),
                    String.format("Promotion: %s", promotion.getType()));
            notifications.add(0, notification);
        }
        return notifications;
    }

    public Shelter getShelter() {
        advanceTime();
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
        advanceTime();
        Shelter shelter = getShelter();
        MoneyDeposit moneyDeposit = new MoneyDeposit(getSessionClock().getCurrentTime(), shelter, amount);
        kieSession.insert(moneyDeposit);
        kieSession.fireAllRules();
    }

    public void shelterAnimal(Animal animal) {
        advanceTime();
        Resettlement resettlement = new Resettlement(getSessionClock().getCurrentTime(), getShelter(), PromotionOrResettlementType.SHELTERING, animal);
        kieSession.insert(resettlement);
        kieSession.fireAllRules();
    }

    public void adoptAnimal(Animal animal) {
        advanceTime();
        System.out.println("Adopting animal: " + animal);
        System.out.println("Shelter animals: " + getShelter().getAnimals());
        Resettlement resettlement = new Resettlement(getSessionClock().getCurrentTime(), getShelter(), PromotionOrResettlementType.ADOPTION, animal);
        kieSession.insert(resettlement);
        kieSession.fireAllRules();
    }
}
