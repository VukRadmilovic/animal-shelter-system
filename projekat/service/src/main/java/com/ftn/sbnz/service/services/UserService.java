package com.ftn.sbnz.service.services;

import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.Worker;
import com.ftn.sbnz.model.models.backModels.NewUser;
import com.ftn.sbnz.model.models.backModels.UserCredentials;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private final KieSession kieSession;

    public UserService(KieSession kieSession) {
        this.kieSession = kieSession;
    }

    public void register(NewUser user) {
        QueryResults results = kieSession.getQueryResults("getWorker",user.getUsername());
        if(results.size() != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already in use!");
        }
        Worker newWorker = new Worker(user.getUsername(), user.getFullName(), user.getPassword(), null);
        kieSession.insert(newWorker);
    }

    public String login(UserCredentials credentials) {
        QueryResults results = kieSession.getQueryResults("checkLogin",credentials.getUsername(), credentials.getPassword());
        if(results.size() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username and password do not match!");
        }
        Worker worker = null;
        for (QueryResultsRow row : results) {
            worker = (Worker) row.get("$worker");
        }
        return  worker.getFullName();
    }
}
