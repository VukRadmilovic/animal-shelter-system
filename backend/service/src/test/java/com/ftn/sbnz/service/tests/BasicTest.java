package com.ftn.sbnz.service.tests;

import com.ftn.sbnz.model.enums.AnimalBreed;
import com.ftn.sbnz.model.enums.AnimalType;
import com.ftn.sbnz.model.enums.PromotionOrResettlementType;
import com.ftn.sbnz.model.enums.ReportType;
import com.ftn.sbnz.model.events.*;
import com.ftn.sbnz.model.models.*;
import org.drools.core.ClassObjectFilter;
import org.drools.template.ObjectDataCompiler;
import org.junit.BeforeClass;
import org.junit.Test;
import org.kie.api.KieServices;
import org.kie.api.builder.Message;
import org.kie.api.builder.Results;
import org.kie.api.io.Resource;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.KieSessionConfiguration;
import org.kie.api.runtime.conf.ClockTypeOption;
import org.kie.api.runtime.rule.QueryResults;
import org.kie.api.runtime.rule.QueryResultsRow;
import org.kie.api.time.SessionPseudoClock;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.utils.KieHelper;

import static org.junit.Assert.*;

import java.util.Collection;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
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
//        System.out.println(continuousTemplateCompiled);
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
                        "DALMATIAN,PUG,HUSKY,SIAMESE_CAT,SPHYNX,PERSIAN_CAT,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,CANARY,PIGEON," +
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
                        "DALMATIAN,PUG,HUSKY,DOMESTIC_SHORTHAIR_CAT,BRITISH_SHORTHAIR_CAT,SIAMESE_CAT,PERSIAN_CAT,SPHYNX,TURTLE,GECKO,BALL_PYTHON," +
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

        InputStream backwardRules = BasicTest.class.getResourceAsStream("/rules/backward/backward.drl");
        Resource backwardResource = ResourceFactory.newInputStreamResource(backwardRules);
        kieHelper.addResource(backwardResource, ResourceType.DRL);

        KieSessionConfiguration config = KieServices.Factory.get().newKieSessionConfiguration();
        config.setOption(ClockTypeOption.get("pseudo"));
        return kieHelper.build().newKieSession(config,null);
    }

    @Test
    public void testBasicRules() {
        KieSession session = createKieSession();

        SessionPseudoClock clock = session.getSessionClock();
        session.insert(clock);

        session.insert(new RecommendationsMap());
        session.insert(new RecommendationFinalistsForUsers());
        session.insert(new GlobalRecommendationChart());
        List<AnimalWithName> animals = new ArrayList<>();
        animals.add(new AnimalWithName(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena"));
        animals.add(new AnimalWithName(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Goober"));
        animals.add(new AnimalWithName(AnimalType.DOG, AnimalBreed.LABRADOR_RETRIEVER,"Groober"));

        List<Price> prices = new ArrayList<>(Arrays.asList(new Price(AnimalType.RABBIT, 20),
                new Price(AnimalType.FISH, 25), new Price(AnimalType.CAT, 40),
                new Price(AnimalType.DOG, 75), new Price(AnimalType.BIRD, 30),
                new Price(AnimalType.REPTILE, 15), new Price(AnimalType.RODENT, 10),
                new Price(AnimalType.SPIDER, 20)));

        List<FoodAvailableForAnimal> foodAvailableForAnimals = new ArrayList<>(Arrays.asList(
                new FoodAvailableForAnimal(1, AnimalType.RABBIT), new FoodAvailableForAnimal(3, AnimalType.FISH),
                new FoodAvailableForAnimal(1, AnimalType.CAT), new FoodAvailableForAnimal(0, AnimalType.DOG),
                new FoodAvailableForAnimal(0, AnimalType.BIRD), new FoodAvailableForAnimal(0, AnimalType.REPTILE),
                new FoodAvailableForAnimal(0, AnimalType.RODENT), new FoodAvailableForAnimal(0, AnimalType.SPIDER)));

        session.insert(new Shelter("Test name", "Test address",
                200000.0, 60,animals,foodAvailableForAnimals,prices));
        session.insert(new Response(123L, 1, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 2, 2));
        session.fireAllRules();
        session.insert(new Response(123L, 3, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 4, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 5, 2));
        session.fireAllRules();
        session.insert(new Response(123L, 6, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 7, 2));
        session.fireAllRules();
        session.insert(new Response(123L, 8, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 9, 1));
        session.fireAllRules();
        session.insert(new Response(123L, 10, 1));
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
        session.insert(new QuestionnaireFilled(123L));
        session.fireAllRules();
    }

    @Test
    public void testShelterForwardChaining() {
        KieSession session = createKieSession();
        SessionPseudoClock clock = session.getSessionClock();
        session.insert(clock);

        List<AnimalWithName> animals = new ArrayList<>();
        animals.add(new AnimalWithName(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena"));
        animals.add(new AnimalWithName(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Hoho"));
        List<Price> prices = new ArrayList<>(Arrays.asList(new Price(AnimalType.RABBIT, 20),
                new Price(AnimalType.FISH, 25), new Price(AnimalType.CAT, 40),
                new Price(AnimalType.DOG, 75), new Price(AnimalType.BIRD, 30),
                new Price(AnimalType.REPTILE, 15), new Price(AnimalType.RODENT, 10),
                new Price(AnimalType.SPIDER, 20)));
        List<FoodAvailableForAnimal> foodAvailableForAnimals = new ArrayList<>(Arrays.asList(
                new FoodAvailableForAnimal(1, AnimalType.RABBIT), new FoodAvailableForAnimal(3, AnimalType.FISH),
                new FoodAvailableForAnimal(1, AnimalType.CAT), new FoodAvailableForAnimal(0, AnimalType.DOG),
                new FoodAvailableForAnimal(0, AnimalType.BIRD), new FoodAvailableForAnimal(0, AnimalType.REPTILE),
                new FoodAvailableForAnimal(0, AnimalType.RODENT), new FoodAvailableForAnimal(0, AnimalType.SPIDER)));
        Shelter shelter = new Shelter("Test name", "Test address",
                60.0 * 9, 4, animals, foodAvailableForAnimals, prices);

        session.insert(shelter);
        int numOfRulesFired = session.fireAllRules();

        assertEquals(3, numOfRulesFired); // calculate money needed for upkeep for new shelter, check if enough food, create reports

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING,
                new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers")));
        numOfRulesFired = session.fireAllRules();
        assertEquals(5, numOfRulesFired); // shelter animal, recalculate money needed, ask for more money, food check, report

        Collection<?> notifications = session.getObjects(new ClassObjectFilter(Notification.class));
        assertEquals(1, notifications.size()); // ask for money notification sent
    }

    @Test
    public void testShelterRules() {
        KieSession session = createKieSession();
        SessionPseudoClock clock = session.getSessionClock();
        session.insert(clock);

        List<AnimalWithName> animals = new ArrayList<>();
        animals.add(new AnimalWithName(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena"));
        animals.add(new AnimalWithName(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Hoho"));
        List<Price> prices = new ArrayList<>(Arrays.asList(new Price(AnimalType.RABBIT, 20),
                new Price(AnimalType.FISH, 25), new Price(AnimalType.CAT, 40),
                new Price(AnimalType.DOG, 75), new Price(AnimalType.BIRD, 30),
                new Price(AnimalType.REPTILE, 15), new Price(AnimalType.RODENT, 10),
                new Price(AnimalType.SPIDER, 20)));
        List<FoodAvailableForAnimal> foodAvailableForAnimals = new ArrayList<>(Arrays.asList(
                new FoodAvailableForAnimal(1, AnimalType.RABBIT), new FoodAvailableForAnimal(3, AnimalType.FISH),
                new FoodAvailableForAnimal(1, AnimalType.CAT), new FoodAvailableForAnimal(0, AnimalType.DOG),
                new FoodAvailableForAnimal(0, AnimalType.BIRD), new FoodAvailableForAnimal(0, AnimalType.REPTILE),
                new FoodAvailableForAnimal(0, AnimalType.RODENT), new FoodAvailableForAnimal(0, AnimalType.SPIDER)));
        Shelter shelter = new Shelter("Test name", "Test address",
                600_000.0, 10, animals, foodAvailableForAnimals, prices);

        session.insert(shelter);
        int numOfRulesFired = session.fireAllRules();

        assertEquals(4, numOfRulesFired); // calculate money needed for upkeep for new shelter, start sheltering promotion, check if enough food, report creation

        AnimalWithName a1 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");
        AnimalWithName a2 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");
        AnimalWithName a3 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");
        AnimalWithName a4 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");
        AnimalWithName a5 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");
        AnimalWithName a6 = new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers");

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a1));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a2));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a3));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a4));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a5));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a6));
        numOfRulesFired = session.fireAllRules();
        assertEquals(15, numOfRulesFired); // 2 per new animal sheltered (1 for updating reports), 1 for recalculate money needed, 1 to stop sheltering promotion, 1 to check if enough food

        Collection<?> notifications = session.getObjects(new ClassObjectFilter(Notification.class));
        assertEquals(1, notifications.size()); // need more food notification sent

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING,
                new AnimalWithName(AnimalType.FISH, AnimalBreed.BIG_FISH, "Myers")));
        numOfRulesFired = session.fireAllRules();
        assertEquals(5, numOfRulesFired); // 1st and 2nd new animal sheltered, 3rd recalculate money, 4th start adoption promotion, 5th food check
        Collection<?> promotions = session.getObjects(new ClassObjectFilter(Promotion.class));
        assertEquals(2, promotions.size()); // new adoption promotion started

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a1));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a2));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a3));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a4));
        numOfRulesFired = session.fireAllRules();
        assertEquals(13, numOfRulesFired); //3 per animal removed, 1 for removing 1 for money recalculation 1 for reports, 1 for food check

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a5));
        numOfRulesFired = session.fireAllRules();
        assertEquals(4, numOfRulesFired); //animal removed x2, money recalculated, 1 for food check

        session.insert(new MoneyDeposit(clock.getCurrentTime(), shelter, 150));
        numOfRulesFired = session.fireAllRules();
        assertEquals(1, numOfRulesFired); // increase available money

        session.insert(new FoodPurchase(clock.getCurrentTime(), shelter, AnimalType.FISH, 4));
        numOfRulesFired = session.fireAllRules();
        assertEquals(1, numOfRulesFired); // decrease available money

        session.insert(new Feeding(clock.getCurrentTime(), shelter, AnimalType.FISH));
        numOfRulesFired = session.fireAllRules();
        notifications = session.getObjects(new ClassObjectFilter(Notification.class));
        assertEquals(2, notifications.size()); // need more food notification sent

        session.insert(new Feeding(clock.getCurrentTime(), shelter, AnimalType.FISH));
        numOfRulesFired = session.fireAllRules();
        assertEquals(2, numOfRulesFired); // decrease food, food check

        session.insert(new Feeding(clock.getCurrentTime(), shelter, AnimalType.FISH));
        numOfRulesFired = session.fireAllRules();
        assertEquals(2, numOfRulesFired); // decrease food, food check
        notifications = session.getObjects(new ClassObjectFilter(Notification.class));
        assertEquals(3, notifications.size()); // need more food notification send

        clock.advanceTime(9, TimeUnit.HOURS);
        numOfRulesFired = session.fireAllRules();
        assertEquals(1, numOfRulesFired); //9AM feeding notification

        clock.advanceTime(2, TimeUnit.HOURS);
        numOfRulesFired = session.fireAllRules();
        assertEquals(0, numOfRulesFired); //no feeding notification

        clock.advanceTime(2, TimeUnit.HOURS);
        numOfRulesFired = session.fireAllRules();
        assertEquals(1, numOfRulesFired); //1PM feeding notification

        clock.advanceTime(5, TimeUnit.HOURS);
        numOfRulesFired = session.fireAllRules();
        assertEquals(1, numOfRulesFired); //6PM feeding notification
    }

    @Test
    public void TestCepRules() {
        KieSession session = createKieSession();
        SessionPseudoClock clock = session.getSessionClock();
        session.insert(clock);

        List<AnimalWithName> animals = new ArrayList<>();
        animals.add(new AnimalWithName(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena"));
        animals.add(new AnimalWithName(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Goober"));
        animals.add(new AnimalWithName(AnimalType.DOG, AnimalBreed.LABRADOR_RETRIEVER,"Groober"));

        List<Price> prices = new ArrayList<>(Arrays.asList(new Price(AnimalType.RABBIT, 20),
                new Price(AnimalType.FISH, 25), new Price(AnimalType.CAT, 40),
                new Price(AnimalType.DOG, 75), new Price(AnimalType.BIRD, 30),
                new Price(AnimalType.REPTILE, 15), new Price(AnimalType.RODENT, 10),
                new Price(AnimalType.SPIDER, 20)));

        List<FoodAvailableForAnimal> foodAvailableForAnimals = new ArrayList<>(Arrays.asList(
                new FoodAvailableForAnimal(1, AnimalType.RABBIT), new FoodAvailableForAnimal(3, AnimalType.FISH),
                new FoodAvailableForAnimal(1, AnimalType.CAT), new FoodAvailableForAnimal(5, AnimalType.DOG),
                new FoodAvailableForAnimal(0, AnimalType.BIRD), new FoodAvailableForAnimal(0, AnimalType.REPTILE),
                new FoodAvailableForAnimal(0, AnimalType.RODENT), new FoodAvailableForAnimal(0, AnimalType.SPIDER)));
        Shelter shelter = new Shelter("Test name", "Test address",
                200000.0, 10,animals,foodAvailableForAnimals,prices);
        session.insert(shelter);
        session.insert(new Promotion(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION));

        clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(clock.getCurrentTime(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();

        //clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(clock.getCurrentTime(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();

        /*clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(clock.getCurrentTime(),shelter,PromotionOrResettlementType.SHELTERING,null));
        session.fireAllRules();*/

        //clock.advanceTime(1, TimeUnit.DAYS);
        session.insert(new Resettlement(clock.getCurrentTime(),shelter,PromotionOrResettlementType.ADOPTION,null));
        session.fireAllRules();
    }

    @Test
    public void testBackward() {
        KieSession session = createKieSession();
        SessionPseudoClock clock = session.getSessionClock();
        session.insert(clock);

        List<AnimalWithName> animals = new ArrayList<>();
        AnimalWithName a = new AnimalWithName(AnimalType.CAT, AnimalBreed.DOMESTIC_SHORTHAIR_CAT,"Lena");
        animals.add(a);
        AnimalWithName b = new AnimalWithName(AnimalType.RABBIT, AnimalBreed.LIONHEAD,"Goober");
        animals.add(b);
        AnimalWithName c = new AnimalWithName(AnimalType.DOG, AnimalBreed.LABRADOR_RETRIEVER,"Groober");
        animals.add(c);

        List<Price> prices = new ArrayList<>(Arrays.asList(new Price(AnimalType.RABBIT, 20),
                new Price(AnimalType.FISH, 25), new Price(AnimalType.CAT, 40),
                new Price(AnimalType.DOG, 75), new Price(AnimalType.BIRD, 30),
                new Price(AnimalType.REPTILE, 15), new Price(AnimalType.RODENT, 10),
                new Price(AnimalType.SPIDER, 20)));

        List<FoodAvailableForAnimal> foodAvailableForAnimals = new ArrayList<>(Arrays.asList(
                new FoodAvailableForAnimal(1, AnimalType.RABBIT), new FoodAvailableForAnimal(3, AnimalType.FISH),
                new FoodAvailableForAnimal(1, AnimalType.CAT), new FoodAvailableForAnimal(5, AnimalType.DOG),
                new FoodAvailableForAnimal(0, AnimalType.BIRD), new FoodAvailableForAnimal(0, AnimalType.REPTILE),
                new FoodAvailableForAnimal(0, AnimalType.RODENT), new FoodAvailableForAnimal(0, AnimalType.SPIDER)));
        Shelter shelter = new Shelter("Test name", "Test address",
                200000.0, 10,animals,foodAvailableForAnimals,prices);
        session.insert(shelter);

//        LocalDate startDate = LocalDate.of(1970, 1, 1); // start date
//        LocalDate today = LocalDate.now().withDayOfMonth(1); // today's date
//
//        long daysBetween = ChronoUnit.DAYS.between(startDate, today); // calculate number of days between start date and today
//        clock.advanceTime(daysBetween - 30, TimeUnit.DAYS);
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 1 day");
        session.fireAllRules();

        clock.advanceTime(27, TimeUnit.DAYS);
        System.out.println("After 28 days");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 29 day");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 30 days");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 31 days");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.HOURS);
        System.out.println("After 31 days and 1 hour");
        session.fireAllRules();

        clock.advanceTime(27, TimeUnit.DAYS);
        System.out.println("After 58 days");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 59 days");
        session.fireAllRules();

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, b));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 60 days");
        session.fireAllRules();

        clock.advanceTime(1, TimeUnit.DAYS);
        System.out.println("After 61 days");
        session.fireAllRules();

        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, b));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        clock.advanceTime(8, TimeUnit.DAYS);
        System.out.println("After 69 days");
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        clock.advanceTime(7, TimeUnit.DAYS);
        System.out.println("After 76 days");
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        clock.advanceTime(7, TimeUnit.DAYS);
        System.out.println("After 83 days");
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.fireAllRules();

        clock.advanceTime(7, TimeUnit.DAYS);
        System.out.println("After 90 days");
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        clock.advanceTime(7, TimeUnit.DAYS);
        System.out.println("After 97 days");
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.SHELTERING, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.insert(new Resettlement(clock.getCurrentTime(), shelter, PromotionOrResettlementType.ADOPTION, a));
        session.fireAllRules();

        System.out.println("Get report from 1.3.1970.");
        QueryResults results = session.getQueryResults("findLeaf", "1.3.1970.");
        for (QueryResultsRow row : results) {
            System.out.println(row.get("$r"));
        }

        System.out.println("Get all reports from 1.3.1970. to 7.3.1970.");
        results = session.getQueryResults("isContainedInNonLeaf", "1.3.1970. - 7.3.1970.");
        for (QueryResultsRow row : results) {
            System.out.println(row.get("$r"));
        }

        System.out.println("Get all reports from 3.1970.");
        Report monthlyReport = getMonthlyReport(session, shelter, "3.1970.");
        System.out.println(monthlyReport);
    }

    private static Report getMonthlyReport(KieSession session, Shelter shelter, String month) {
        QueryResults results;
        results = session.getQueryResults("isContainedInNonLeaf", month);
        Report monthlyReport = new Report(month, "", ReportType.MONTHLY, shelter);
        for (QueryResultsRow row : results) {
            Report r = (Report) row.get("$r");
            monthlyReport.incrementAdoptionCount(r.getAdoptionCount());
            monthlyReport.incrementShelteringCount(r.getShelteringCount());
        }
        return monthlyReport;
    }
}
