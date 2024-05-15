package com.ftn.sbnz.model.models;

public class QuestionWithLimitsAndRecommendations {
    private String ruleName;
    private int questionId;
    private double lowLimit;
    private double highLimit;
    private String recommendationsLow;
    private String recommendationsMid;
    private String recommendationsHigh;

    public QuestionWithLimitsAndRecommendations(String ruleName, int questionId, double lowLimit, double highLimit, String recommendationsLow, String recommendationsMid, String recommendationsHigh) {
        this.ruleName = ruleName;
        this.questionId = questionId;
        this.lowLimit = lowLimit;
        this.highLimit = highLimit;
        this.recommendationsLow = recommendationsLow;
        this.recommendationsMid = recommendationsMid;
        this.recommendationsHigh = recommendationsHigh;
    }

    public QuestionWithLimitsAndRecommendations() {
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public double getLowLimit() {
        return lowLimit;
    }

    public void setLowLimit(double lowLimit) {
        this.lowLimit = lowLimit;
    }

    public double getHighLimit() {
        return highLimit;
    }

    public void setHighLimit(double highLimit) {
        this.highLimit = highLimit;
    }

    public String getRecommendationsLow() {
        return recommendationsLow;
    }

    public void setRecommendationsLow(String recommendationsLow) {
        this.recommendationsLow = recommendationsLow;
    }

    public String getRecommendationsMid() {
        return recommendationsMid;
    }

    public void setRecommendationsMid(String recommendationsMid) {
        this.recommendationsMid = recommendationsMid;
    }

    public String getRecommendationsHigh() {
        return recommendationsHigh;
    }

    public void setRecommendationsHigh(String recommendationsHigh) {
        this.recommendationsHigh = recommendationsHigh;
    }

    @Override
    public String toString() {
        return "QuestionWithLimitsAndRecommendations{" +
                "ruleName='" + ruleName + '\'' +
                ", questionId=" + questionId +
                ", lowLimit=" + lowLimit +
                ", highLimit=" + highLimit +
                ", recommendationsLow='" + recommendationsLow + '\'' +
                ", recommendationsMid='" + recommendationsMid + '\'' +
                ", recommendationsHigh='" + recommendationsHigh + '\'' +
                '}';
    }
}
