package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.Shelter;
import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import com.ftn.sbnz.model.models.backModels.ShelterInfo;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.springframework.stereotype.Service;

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
}
