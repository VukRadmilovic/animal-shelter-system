package com.ftn.sbnz.service;

import java.time.LocalDateTime;
import java.util.Arrays;

import com.ftn.sbnz.model.events.Notification;
import com.ftn.sbnz.model.models.FinalistsForUsers;
import com.ftn.sbnz.model.models.GlobalChart;
import com.ftn.sbnz.model.models.RecommendationsMap;
import com.ftn.sbnz.model.models.backModels.Questionnaire;
import com.ftn.sbnz.service.utils.RuleBaseInitialization;
import org.kie.api.runtime.KieSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.kie.api.KieServices;
import org.kie.api.builder.KieScanner;
import org.kie.api.runtime.KieContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class ServiceApplication  {

	private final RuleBaseInitialization ruleBaseInitialization = new RuleBaseInitialization();
	private static final Logger log = LoggerFactory.getLogger(ServiceApplication.class);
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(ServiceApplication.class, args);

		String[] beanNames = ctx.getBeanDefinitionNames();
		Arrays.sort(beanNames);

		StringBuilder sb = new StringBuilder("Application beans:\n");
		for (String beanName : beanNames) {
			sb.append(beanName + "\n");
		}
		log.info(sb.toString());
	}

	@Bean
	public KieContainer kieContainer() {
		KieServices ks = KieServices.Factory.get();
		KieContainer kContainer = ks
				.newKieContainer(ks.newReleaseId("com.ftn.sbnz", "kjar", "0.0.1-SNAPSHOT"));
		KieScanner kScanner = ks.newKieScanner(kContainer);
		kScanner.start(1000);
		return kContainer;
	}

	@Bean
	public KieSession kieSession() {
		KieSession newSession = ruleBaseInitialization.createKieSession();
		newSession.insert(new RecommendationsMap());
		newSession.insert(new FinalistsForUsers());
		newSession.insert(new GlobalChart());
		return newSession;
	}

}
