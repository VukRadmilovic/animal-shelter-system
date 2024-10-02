package com.ftn.sbnz.model.models;

import com.ftn.sbnz.model.enums.PromotionOrResettlementType;

public class PromotionTermination {
    private PromotionOrResettlementType promotionType;
    private PromotionOrResettlementType lessThanAction;

    public PromotionTermination(PromotionOrResettlementType promotionType, PromotionOrResettlementType lessThanAction) {
        this.promotionType = promotionType;
        this.lessThanAction = lessThanAction;
    }

    public PromotionOrResettlementType getPromotionType() {
        return promotionType;
    }

    public void setPromotionType(PromotionOrResettlementType promotionType) {
        this.promotionType = promotionType;
    }

    public PromotionOrResettlementType getLessThanAction() {
        return lessThanAction;
    }

    public void setLessThanAction(PromotionOrResettlementType lessThanAction) {
        this.lessThanAction = lessThanAction;
    }
}
