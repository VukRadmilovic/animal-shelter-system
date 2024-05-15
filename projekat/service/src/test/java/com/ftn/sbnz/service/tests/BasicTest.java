package com.ftn.sbnz.service.tests;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;
import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.events.Promotion;
import com.ftn.sbnz.model.events.QuestionnaireFilled;
import com.ftn.sbnz.model.events.Resettlement;
import com.ftn.sbnz.model.models.*;
import org.drools.template.ObjectDataCompiler;
import org.junit.BeforeClass;
import org.junit.Test;
import org.kie.api.KieServices;
import org.kie.api.builder.Message;
import org.kie.api.builder.Results;
import org.kie.api.io.ResourceType;
import org.kie.api.io.Resource;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.KieSessionConfiguration;
import org.kie.api.runtime.conf.ClockTypeOption;
import org.kie.api.time.SessionPseudoClock;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.utils.KieHelper;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class BasicTest {

    private static String basicTemplateCompiled;
    private static String continuousTemplateCompiled;
    private static String cepTemplateCompiled;
    @BeforeClass
    public static void initializeAllTemplates() {
       initializeBasicTemplate();
       initializeContinuousTemplate();
       initializeCepTemplate();
    }

    private static void initializeContinuousTemplate() {
        InputStream template = BasicTest.class.getResourceAsStream("/rules/template/continuous_recommendations.drt");
        List<QuestionWithLimitsAndRecommendations> petRecommendationRules = new ArrayList<>();

        petRecommendationRules.add(new QuestionWithLimitsAndRecommendations("Number of co-tenants", 11, 2, 3,
                "TURTLE,GECKO,BALL_PYTHON,BEARDED_DRAGON,TARANTULA,BIG_FISH,SMALL_FISH,DOMESTIC_SHORTHAIR_CAT," +
                        "BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,PERSIAN_CAT,SPHYNX,GUINEA_PIG,HAMSTER",
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,CANARY,PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,BUNNY," +
                        "DUTCH_DWARF_RABBIT,LIONHEAD,GUINEA_PIG,HAMSTER",
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA," +
                        "ROTTWEILER,DALMATIAN,PUG,HUSKY,CANARY,PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR," +
                        "GUINEA_PIG,HAMSTER"));

        petRecommendationRules.add(new QuestionWithLimitsAndRecommendations("Living space", 12, 100, 200,
                "BULLDOG,POODLE,CHIHUAHUA,PUG,SPHYNX,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT," +
                        "PERSIAN_CAT,SIAMESE_CAT,TARANTULA,BIG_FISH,SMALL_FISH,GECKO,BEARDED_DRAGON,BALL_PYTHON,TURTLE," +
                        "HAMSTER",
                "CANARY,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,PIGEON,LABRADOR_RETRIEVER," +
                        "GOLDEN_RETRIEVER,BULLDOG,BEAGLE,CHIHUAHUA,ROTTWEILER,DALMATIAN,PUG,HUSKY," +
                        "DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,PERSIAN_CAT,SIAMESE_CAT,BUNNY," +
                        "DUTCH_DWARF_RABBIT,LIONHEAD,GUINEA_PIG",
                "CANARY,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,PIGEON,LABRADOR_RETRIEVER," +
                        "GOLDEN_RETRIEVER,BULLDOG,BEAGLE,CHIHUAHUA,ROTTWEILER,DALMATIAN,PUG,HUSKY"));

        petRecommendationRules.add(new QuestionWithLimitsAndRecommendations("Monthly spending money", 13, 1500, 4000,
                "DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,TURTLE,SMALL_FISH,HAMSTER," +
                        "CANARY,PIGEON,GUINEA_PIG",
                "CANARY,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,PIGEON,LABRADOR_RETRIEVER," +
                        "BIG_FISH,BUNNY,LIONHEAD,DUTCH_DWARF_RABBIT,COCKATIEL,BUDGERIGAR,BEARDED_DRAGON," +
                        "LABRADOR_RETRIEVER,GOLDEN_RETRIEVER,BEAGLE,ROTTWEILER,DALMATIAN",
                "GERMAN_SHEPHERD,POODLE,CHIHUAHUA,PUG,HUSKY,PERSIAN_CAT,SPHYNX,AFRICAN_GRAY_PARROT," +
                        "BALL_PYTHON"));

        petRecommendationRules.add(new QuestionWithLimitsAndRecommendations("Daily absence in hours", 14, 2, 10,
                "PUG,HUSKY,LABRADOR_RETRIEVER,GOLDEN_RETRIEVER,BEAGLE,AFRICAN_GRAY_PARROT,CHIHUAHUA," +
                        "POODLE",
                "DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,PERSIAN_CAT,SIAMESE_CAT,SPHYNX,CANARY," +
                        "PIGEON,COCKATIEL,BUDGERIGAR,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD,GERMAN_SHEPHERD,DALMATIAN," +
                        "ROTTWEILER",
                "BALL_PYTHON,BEARDED_DRAGON,GECKO,TURTLE,GUINEA_PIG,HAMSTER,SMALL_FISH,BIG_FISH"));

        petRecommendationRules.add(new QuestionWithLimitsAndRecommendations("Daily time devoted to pet in hours", 15, 1, 3,
                "TURTLE,GUINEA_PIG,HAMSTER,GECKO,BALL_PYTHON,BEARDED_DRAGON,SMALL_FISH,BIG_FISH," +
                        "POODLE,CHIHUAHUA,PUG,PIGEON",
                "DUTCH_DWARF_RABBIT,LIONHEAD,BUNNY,BULLDOG,LABRADOR_RETRIEVER,GOLDEN_RETRIEVER," +
                        "BEAGLE,ROTTWEILER,DALMATIAN,HUSKY,GERMAN_SHEPHERD,CANARY,COCKATIEL,BUDGERIGAR," +
                        "BRITISH_SHORTHAIR_CAT,DOMESTIC_SHORTHAIR_CAT,SIAMESE_CAT",
                "BULLDOG,LABRADOR_RETRIEVER,GOLDEN_RETRIEVER,BEAGLE,ROTTWEILER,DALMATIAN,HUSKY," +
                        "GERMAN_SHEPHERD,AFRICAN_GRAY_PARROT,PERSIAN_CAT,SPHYNX"));

        ObjectDataCompiler converter = new ObjectDataCompiler();
        continuousTemplateCompiled = converter.compile(petRecommendationRules, template);
        System.out.println(continuousTemplateCompiled);
    }

    private static void initializeBasicTemplate() {
        InputStream template = BasicTest.class.getResourceAsStream("/rules/template/basic_recommendations.drt");
        List<QuestionResponseWithRecommendation> petRecommendationRules = new ArrayList<>();

        petRecommendationRules.add(new QuestionResponseWithRecommendation("Lives with kids", 1, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,DALMATIAN,BUNNY,DUTCH_DWARF_RABBIT," +
                        "LIONHEAD,BIG_FISH,SMALL_FISH,HAMSTER,GUINEA_PIG,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,CANARY," +
                        "PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Does not live with kids", 1, 2,
                "BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER,PUG,HUSKY,TURTLE,SPHYNX,PERSIAN_CAT," +
                        "TARANTULA,GECKO,BALL_PYTHON,BEARDED_DRAGON"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Lives in an apartment", 2, 1,
                "PUG,POODLE,CHIHUAHUA,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,TARANTULA,SIAMESE_CAT,SPHYNX," +
                        "PERSIAN_CAT,GECKO,BALL_PYTHON,BEARDED_DRAGON,HAMSTER,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD,BIG_FISH,SMALL_FISH"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Lives in a house", 2, 2,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,SIAMESE_CAT,SPHYNX,PERSIAN,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,CANARIAN,PIGEON," +
                        "AFRICAN_GRAY_PARROT,BUDGERIGAR,COCKATIEL,GUINEA_PIG,HAMSTER"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Has access to the yard", 3, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD,PERSIAN_CAT,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT," +
                        "SIAMESE_CAT,SPHYNX,GUINEA_PIG,CANARY,PIGEON,AFRICAN_GRAY_PARROT,BUDGERIGAR,COCKATIEL"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Does not have access to the yard", 3, 2,
                "CHIHUAHUA,PUG,POODLE,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,SPHYNX,PERSIAN_CAT," +
                        "CANARY,PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,TURTLE,GECKO,BALL_PYTHON,BEARDED_DRAGON," +
                        "TARANTULA,BIG_FISH,SMALL_FISH,HAMSTER"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Is very active", 4, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,BEAGLE,ROTTWEILER,HUSKY"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Is medium active", 4, 2,
                "POODLE,DALMATIAN,PUG,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,CANARY,PIGEON," +
                        "AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Is little active", 4, 3,
                "CHIHUAHUA,SPHYNX,PERSIAN_CAT,GECKO,BALL_PYTHON,BEARDED_DRAGON,GUINEA_PIG,TARANTULA,BIG_FISH," +
                        "SMALL_FISH,HAMSTER"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Lives in the city", 5, 1,
                "TURTLE,TARANTULA,GECKO,BEARDED_DRAGON,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,SPHYNX," +
                        "PERSIAN_CAT,LABRADOR_RETRIEVER,BULLDOG,POODLE,CHIHUAHUA,PUG,BIG_FISH,SMALL_FISH"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Lives in the town/village", 5, 2,
                "GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BEAGLE,ROTTWEILER,DALMATIAN,HUSKY,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD," +
                        "SPHYNX,PERSIAN_CAT,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,PIGEON,TURTLE,TARANTULA,GECKO,BALL_PYTHON," +
                        "BEARDED_DRAGON,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,LABRADOR_RETRIEVER"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Has other pets", 6, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,TARANTULA,HAMSTER,GUINEA_PIG,BIG_FISH,SMALL_FISH,GECKO,BALL_PYTHON,BEARDED_DRAGON,TURTLE"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Does not have other pets", 6, 2,
                "CANARY,PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD,DOMESTIC_SHORTHAIR_CAT," +
                        "SIAMESE_CAT,SPHYNX,BRITISH_SHORTHAIR_CAT,PERSIAN_CAT"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Does not have allergies", 7, 1,
                ""));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Has feather allergy", 7, 2,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHOTHAIR_CAT,SIAMESE_CAT,PERSIAN_CAT,SPHYNX,TURTLE,GECKO,BALL_PYTHON," +
                        "BEARDED_DRAGON,GUINEA_PIG,HAMSTER,BIG_FISH,SMALL_FISH,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Has hair allergy", 7, 3,
                "TURTLE,GECKO,BALL_PYTHON,BEARDED_DRAGON,SPHYNX,CANARY,AFRICAN_GRAY_PARROT,COCKATIEL," +
                        "BUDGERIGAR,PIGEON"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Has hair and feather allergy", 7, 4,
                "TURTLE,GECKO,BALL_PYTHON,BEARDED_DRAGON,SPHYNX"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Wants a more active pet", 8, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BEAGLE,ROTTWEILER,DALMATIAN,HUSKY," +
                        "BUNNY,DUTCH_DWARF_RABBIT,AFRICAN_GRAY_PARROT"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Wants a more inactive pet", 8, 2,
                "LIONHEAD,BIG_FISH,SMALL_FISH,TARANTULA,GUINEA_PIG,GECKO,BALL_PYTHON,BEARDED_DRAGON,TURTLE," +
                        "CANARY,PIGEON,COCKATIEL,BUDGERIGAR,HAMSTER,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,PERSIAN_CAT," +
                        "SIAMESE_CAT,SPHYNX"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Wants a more sociable pet", 9, 1,
                "LABRADOR_RETRIEVER,BULLDOG,BEAGLE,ROTTWEILER,DALMATIAN,PUG,HUSKY,GOLDEN_RETRIEVER,CANARY," +
                        "PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR,BIG_FISH,SMALL_FISH,GUINEA_PIG,DOMESTIC_SHORTHAIR_CAT," +
                        "BRITISH_SHORTHAIR_CAT"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Wants a more solitary pet", 9, 2,
                "CHIHUAHUA,POODLE,SIAMESE_CAT,HAMSTER,GERMAN_SHEPHERD,SPHYNX,PERSIAN_CAT,TURTLE,BIG_FISH,SMALL_FISH,LIONHEAD," +
                        "TARANTULA,GUINEA_PIG,GECKO,BALL_PYTHON,BEARDED_DRAGON,BUNNY,DUTCH_DWARF_RABBIT"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Does not mind the noise", 10, 1,
                "LABRADOR_RETRIEVER,GERMAN_SHEPHERD,GOLDEN_RETRIEVER,BULLDOG,POODLE,BEAGLE,CHIHUAHUA,ROTTWEILER," +
                        "DALMATIAN,PUG,HUSKY,CANARY,PIGEON,AFRICAN_GRAY_PARROT,COCKATIEL,BUDGERIGAR"));
        petRecommendationRules.add(new QuestionResponseWithRecommendation("Minds the noise", 10, 2,
                "DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,PERSIAN_CAT,SPHYNX,HAMSTER,BIG_FISH," +
                        "SMALL_FISH,BUNNY,DUTCH_DWARF_RABBIT,LIONHEAD,TURTLE,TARANTULA,GECKO,BALL_PYTHON,BEARDED_DRAGON,ROTTWEILER"));
        ObjectDataCompiler converter = new ObjectDataCompiler();
        basicTemplateCompiled = converter.compile(petRecommendationRules, template);
        //System.out.println(basicTemplateCompiled);
    }

    private static void initializeCepTemplate(){
        InputStream template = BasicTest.class.getResourceAsStream("/rules/template/cep_rules.drt");
        List<PromotionTermination> terminations = new ArrayList<>();
        terminations.add(new PromotionTermination(PromotionOrResettlementType.SHELTERING, PromotionOrResettlementType.ADOPTION));
        terminations.add(new PromotionTermination(PromotionOrResettlementType.ADOPTION, PromotionOrResettlementType.SHELTERING));
        ObjectDataCompiler converter = new ObjectDataCompiler();
        cepTemplateCompiled = converter.compile(terminations, template);
        //System.out.println(cepTemplateCompiled);
    }

    private static KieSession createKieSession(){
        KieHelper kieHelper = new KieHelper();
        kieHelper.addContent(basicTemplateCompiled, ResourceType.DRL);
        kieHelper.addContent(continuousTemplateCompiled, ResourceType.DRL);
        kieHelper.addContent(cepTemplateCompiled, ResourceType.DRL);
        Results results = kieHelper.verify();
        if (results.hasMessages(Message.Level.WARNING, Message.Level.ERROR)){
            List<Message> messages = results.getMessages(Message.Level.WARNING, Message.Level.ERROR);
            for (Message message : messages) {
                System.out.println("Error: "+message.getText());
            }
            throw new IllegalStateException("Compilation errors were found. Check the logs.");
        }
        InputStream basicRules = BasicTest.class.getResourceAsStream("/rules/basic/basic.drl");
        Resource ruleResource = ResourceFactory.newInputStreamResource(basicRules);
        kieHelper.addResource(ruleResource, ResourceType.DRL);
        KieSessionConfiguration config = KieServices.Factory.get().newKieSessionConfiguration();
        config.setOption(ClockTypeOption.get("pseudo"));
        return kieHelper.build().newKieSession(config,null);
    }

    @Test
    public void testBasicRules() {
        KieSession session = createKieSession();
        session.insert(new RecommendationsMap());
        session.insert(new FinalistsForUsers());
        session.insert(new GlobalChart());
        List<Animal> animals = new ArrayList<>();
        animals.add(new Animal(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena"));
        animals.add(new Animal(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Hoho"));
        session.insert(new Shelter("Test name", "Test address",
                200000.0, 60,animals,null,null));
        session.insert(new Response(123L, 1, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 2, 1));
        session.fireAllRules();
        session.insert(new QuestionnaireFilled(123L));
        session.fireAllRules();
        session.insert(new Response(123L, 11, 5));
        session.fireAllRules();
        session.insert(new Response(123L, 12, 50));
        session.fireAllRules();
        session.insert(new Response(123L, 13, 2500.5));
        session.fireAllRules();
        session.insert(new Response(123L, 14, 11));
        session.fireAllRules();
        session.insert(new Response(123L, 15, 0.5));
        session.fireAllRules();
    }

    @Test
    public void TestCepRules() {
        KieSession session = createKieSession();
        Shelter shelter = new Shelter("Test name", "Test address",
                200000.0, 10,null,null,null);
        session.insert(shelter);
        session.insert(new Promotion(shelter,PromotionOrResettlementType.ADOPTION, null));
        SessionPseudoClock clock = session.getSessionClock();

        clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(LocalDateTime.now(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(LocalDateTime.now(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();

        /*clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(LocalDateTime.now(),shelter,PromotionOrResettlementType.SHELTERING,null));
        session.fireAllRules();*/

        clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(LocalDateTime.now(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();
    }
}
