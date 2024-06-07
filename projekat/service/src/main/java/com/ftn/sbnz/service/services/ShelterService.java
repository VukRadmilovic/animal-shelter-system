package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.models.backModels.AnimalsWithBreeds;
import org.kie.api.runtime.KieSession;
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
}
