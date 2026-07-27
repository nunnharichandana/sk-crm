package com.sksmartinsurance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SkSmartInsuranceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkSmartInsuranceApplication.class, args);
    }
}
