package com.ftn.sbnz.model.models;

import java.util.List;

public class Suggestions {
    private List<Suggestion> suggestions;

    public Suggestions(List<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }

    public List<Suggestion> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<Suggestion> suggestions) {
        this.suggestions = suggestions;
    }
}
